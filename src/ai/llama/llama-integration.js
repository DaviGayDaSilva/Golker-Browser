/**
 * Golker AI Module
 * Integração com modelo LLaMA 3 (open-source)
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class GolkerAI {
  constructor(config = {}) {
    this.config = {
      modelPath: config.modelPath || path.join(process.env.HOME || '', '.local/share/golker/models/llama-3-8b-q4.bin'),
      maxContext: config.maxContext || 8192,
      quantize: config.quantize || 'q4_K_M',
      threads: config.threads || 4,
      ...config
    };
    
    this.llamaProcess = null;
    this.isReady = false;
    this.conversations = new Map();
  }

  /**
   * Inicializa o modelo LLaMA
   */
  async initialize() {
    console.log('Inicializando Golker AI...');
    console.log('Modelo:', this.config.modelPath);
    
    // Verificar se o modelo existe
    if (!fs.existsSync(this.config.modelPath)) {
      console.warn('Modelo não encontrado. Baixando...');
      await this.downloadModel();
    }
    
    // Iniciar processo llama.cpp
    this.llamaProcess = spawn('llama-cli', [
      '-m', this.config.modelPath,
      '-c', this.config.maxContext.toString(),
      '-t', this.config.threads.toString(),
      '--color',
      '--interactive'
    ], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    this.llamaProcess.stdout.on('data', (data) => {
      console.log('LLaMA:', data.toString());
    });

    this.llamaProcess.stderr.on('data', (data) => {
      console.error('LLaMA Error:', data.toString());
    });

    this.isReady = true;
    console.log('Golker AI pronto!');
  }

  /**
   * Baixa o modelo LLaMA 3 8B
   */
  async downloadModel() {
    const modelDir = path.dirname(this.config.modelPath);
    
    if (!fs.existsSync(modelDir)) {
      fs.mkdirSync(modelDir, { recursive: true });
    }
    
    // Simulação - em produção usaria wget/curl
    console.log('Use: wget -O', this.config.modelPath, '<URL_DO_MODELO>');
  }

  /**
   * Envia uma consulta para a IA
   */
  async query(prompt, options = {}) {
    if (!this.isReady) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      try {
        // Construir prompt no formato LLaMA
        const fullPrompt = this.buildPrompt(prompt, options);
        
        // Enviar para o modelo
        this.llamaProcess.stdin.write(fullPrompt + '\n');
        
        let response = '';
        
        // Coletar resposta
        const onData = (data) => {
          response += data.toString();
          if (response.includes('</s>') || response.includes('llama:')) {
            this.llamaProcess.stdout.removeListener('data', onData);
            resolve(this.parseResponse(response));
          }
        };
        
        this.llamaProcess.stdout.on('data', onData);
        
        // Timeout
        setTimeout(() => {
          this.llamaProcess.stdout.removeListener('data', onData);
          resolve(this.parseResponse(response));
        }, options.timeout || 30000);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Constrói prompt otimizado
   */
  buildPrompt(prompt, options) {
    const systemPrompt = options.system || 'Você é um assistente útil em um navegador web. Responda de forma clara e concisa.';
    const history = this.conversations.get(options.sessionId || 'default') || [];
    
    let fullPrompt = `[INST] <<SYS>>\n${systemPrompt}\n<</SYS>>\n\n`;
    
    // Adicionar histórico
    for (const msg of history.slice(-5)) {
      fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    }
    
    fullPrompt += `User: ${prompt} [/INST]`;
    
    return fullPrompt;
  }

  /**
   * Analisa resposta do modelo
   */
  parseResponse(response) {
    // Limpar resposta
    let cleaned = response
      .replace(/\[INST\].*?\[\/INST\]/g, '')
      .replace(/<s>|<\/s>/g, '')
      .trim();
    
    return {
      response: cleaned,
      tokens: cleaned.split(/\s+/).length,
      model: 'llama-3-8b'
    };
  }

  /**
   * Resume conteúdo de página web
   */
  async summarize(content, maxLength = 200) {
    const prompt = `Resuma o seguinte conteúdo em no máximo ${maxLength} palavras:\n\n${content.substring(0, 10000)}`;
    return this.query(prompt, { system: 'Você é um assistente que resume conteúdos de forma clara e concisa.' });
  }

  /**
   * Traduz texto
   */
  async translate(text, targetLang = 'pt') {
    const prompt = `Traduza o seguinte texto para ${targetLang}:\n\n${text}`;
    return this.query(prompt, { system: 'Você é um tradutor Expert. Traduza com precisão.' });
  }

  /**
   * Escreve conteúdo
   */
  async write(topic, type = 'general') {
    const prompts = {
      email: `Escreva um email profissional sobre: ${topic}`,
      article: `Escreva um artigo sobre: ${topic}`,
      summary: `Faça um resumo de: ${topic}`,
      general: `Escreva sobre: ${topic}`
    };
    
    const prompt = prompts[type] || prompts.general;
    return this.query(prompt, { system: 'Você é um assistente de escrita Expert.' });
  }

  /**
   * Encerra o módulo de IA
   */
  destroy() {
    if (this.llamaProcess) {
      this.llamaProcess.kill();
    }
    this.isReady = false;
  }
}

module.exports = GolkerAI;
