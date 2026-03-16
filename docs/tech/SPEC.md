# Especificações Técnicas - Golker Browser

## 1. Visão Geral

**Golker Browser** é um navegador web de código aberto construído sobre o motor Blink do Chromium, otimizado para mínimo consumo de RAM e com IA integrada usando modelos open-source.

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    Golker Browser                        │
├─────────────────────────────────────────────────────────┤
│  UI Layer (HTML/CSS/JS)                                 │
├─────────────────────────────────────────────────────────┤
│  Electron Framework                                     │
├─────────────────────────────────────────────────────────┤
│  Chromium Blink Engine                                  │
├─────────────────────────────────────────────────────────┤
│  AI Module (LLaMA 3 8B)                                 │
└─────────────────────────────────────────────────────────┘
```

## 3. Motor Blink - Otimizações

### 3.1 Configurações de Memória

| Parâmetro | Valor Padrão | Otimizado |
|-----------|--------------|-----------|
| Tab Suspension | Desabilitado | Habilitado |
| Image Lazy Load | Parcial | Total |
| JS Heap Size | Dinâmico | Limitado |
| Cache Disk | 100MB | 250MB |

### 3.2 Flags do Chromium

```javascript
// flags.js
const CHROMIUM_FLAGS = [
  '--disable-background-timer-throttling',
  '--disable-renderer-backgrounding',
  '--enable-features=NetworkService,NetworkServiceInProcess',
  '--disable-features=TranslateUI,IdleDetection',
  '--js-flags=--max-old-space-size=256'
];
```

## 4. Módulo de IA

### 4.1 Modelo

- **Nome**: LLaMA 3 8B
- **Tipo**: Transformer Decoder-only
- **Parâmetros**: 8 bilhões
- **Quantização**: Q4_K_M (4-bit)
- **RAM Mínima**: 4GB
- **Tamanho do Modelo**: ~4.8GB

### 4.2 Integração

```javascript
// AI Module Structure
class GolkerAI {
  constructor() {
    this.model = null;
    this.context = [];
  }

  async loadModel() {
    // Carrega LLaMA 3 localmente
  }

  async query(prompt) {
    // Processa prompt e retorna resposta
  }
}
```

### 4.3 Funcionalidades

| Função | Descrição | Latência Média |
|--------|-----------|----------------|
| Chat | Conversa geral | < 500ms |
| Resumir | Resume páginas web | < 2s |
| Traduzir | Traduz textos | < 1s |
| Escrever | Auxilia redação | < 3s |

## 5. Benchmarks de Memória

### 5.1 Standby (0 abas)

| Navegador | RAM Usada |
|-----------|-----------|
| **Golker** | **~50MB** |
| Brave | ~120MB |
| Firefox | ~150MB |
| Chrome | ~200MB |
| Edge | ~180MB |

### 5.2 Carga Média (10 abas)

| Navegador | RAM Usada |
|-----------|-----------|
| **Golker** | **~150MB** |
| Brave | ~500MB |
| Firefox | ~600MB |
| Chrome | ~800MB |
| Edge | ~750MB |

## 6. Formatos de Distribuição

### 6.1 Linux

| Formato | Arquivo | Tamanho Est. |
|---------|---------|--------------|
| DEB | golker-browser_1.0.0_amd64.deb | ~120MB |
| AppImage | GolkerBrowser-1.0.0.AppImage | ~150MB |
| RPM | golker-browser-1.0.0.x86_64.rpm | ~120MB |

### 6.2 Android

| Formato | Arquivo | Tamanho Est. |
|---------|---------|--------------|
| APK | GolkerBrowser-1.0.0.apk | ~80MB |

## 7. Segurança

### 7.1 Medidas Implementadas

- ✅ Sandbox enabled
- ✅ Context Isolation
- ✅ No remote content (salvo usuário)
- ✅ CSP estrito
- ✅ Sem telemetria

### 7.2 IA Local

- 100% dos dados processados localmente
- Nenhum dado enviado para servidores externos
- Modelo executado via llama.cpp

## 8. Compilação

### 8.1 Dependências

```bash
# Ubuntu/Debian
sudo apt install build-essential git python3 cmake ninja-build

# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Rust (para alcune dependências)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 8.2 Build

```bash
# Clone
git clone https://github.com/golker/golker-browser.git
cd golker-browser

# Instale dependências
make deps

# Compile
make build-deb    # DEB
make build-appimage # AppImage
make build-apk    # Android
```

## 9. Licença

**GPLv3** - See LICENSE file

## 10. Contato

- Website: https://golker.dev
- GitHub: https://github.com/golker/golker-browser
- Email: hello@golker.dev
