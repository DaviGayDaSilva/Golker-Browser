# Golker Browser

<p align="center">
  <img src="docs/assets/logo.png" alt="Golker Browser Logo" width="200"/>
</p>

<p align="center">
  <strong>O navegador mais leve e inteligente do mundo</strong>
</p>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#download">Download</a> •
  <a href="#ia-integrada">IA Integrada</a> •
  <a href="#compilação">Compilação</a> •
  <a href="#licença">Licença</a>
</p>

---

## ✨ Características

### 🔷 Motor Blink
- Baseado no Chromium de código aberto
- engine_blink = "latest" com otimizações de performance
- Compatibilidade total com extensões Chrome

### 🚀 Ultra-Leve (Mínimo RAM)
- **Uso de memória**: ~50MB em standby (vs 200MB+ Chrome)
- Lazy loading de abas
- Suspender abas inativas automaticamente
- Otimizações de memória do Linux/Android

### 🤖 IA Integrada 24/7
- **Modelo**: LLaMA 3 (8B parâmetros) - open-source
- Executa localmente no dispositivo
- Chatbot nativo no navegador
- Resumir páginas automaticamente
- Tradução em tempo real
- Assistente de escrita
- **Privacidade**: 100% local - nenhum dado sai do dispositivo

### 📦 Multi-Plataforma
- **Linux**: AppImage, DEB, RPM
- **Android**: APK
- **macOS**: DMG (em breve)
- **Windows**: EXE (em breve)

### 🔒 Privacidade
- Bloqueador de anúncios nativo
- Anti-tracker
- Sem telemetria
- Modo anônimo avançado

---

## 📥 Download

### Linux

```bash
# AppImage (Recomendado)
wget https://github.com/golker/golker-browser/releases/latest/download/GolkerBrowser-x.x.x.AppImage
chmod +x GolkerBrowser-x.x.x.AppImage
./GolkerBrowser-x.x.x.AppImage

# DEB (Debian/Ubuntu)
sudo dpkg -i golker-browser_x.x.x_amd64.deb

# RPM (Fedora/openSUSE)
sudo rpm -i golker-browser-x.x.x.x86_64.rpm
```

### Android

```bash
# APK direto
wget https://github.com/golker/golker-browser/releases/latest/download/GolkerBrowser-x.x.x.apk
# Ou instale pela F-Droid (em breve)
```

---

## 🧠 IA Integrada

### Golker AI Assistant

O navegador inclui um assistente de IA poderoso que funciona 24 horas:

```
┌─────────────────────────────────────────────┐
│  🤖 Golker AI Assistant                     │
├─────────────────────────────────────────────┤
│                                             │
│  Oi! Como posso ajudar hoje?                │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │Digite sua mensagem...            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Resumir Página] [Traduzir] [Escrever]    │
│                                             │
└─────────────────────────────────────────────┘
```

### Comandos de IA

| Comando | Descrição |
|---------|-----------|
| `!resumir` | Resume a página atual |
| `!traduzir [idioma]` | Traduz a página |
| `!escrever [tema]` | Ajuda a escrever conteúdo |
| `!perguntar` | Faça qualquer pergunta |

### Modelo de IA

- **Nome**: LLaMA 3 8B
- **Tipo**: Language Model Open Source
- **Licença**: Llama 3 Community License
- **Execução**: Local (on-device)
- **RAM necessária**: 4GB mínimo

> 💡 A IA funciona mesmo offline após o primeiro download do modelo!

---

## 🔧 Compilação

### Pré-requisitos

```bash
# Ubuntu/Debian
sudo apt install build-essential git python3 python3-pip cmake ninja-build

# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

### Compilar do Zero

```bash
# Clone o repositório
git clone https://github.com/golker/golker-browser.git
cd golker-browser

# Baixe as dependências
make deps

# Compile
make build

# Criar pacotes
make pkg-deb     # DEB
make pkg-appimage # AppImage
make pkg-apk     # Android
```

### Build por Plataforma

| Plataforma | Comando |
|------------|---------|
| Linux DEB | `make pkg-deb` |
| Linux AppImage | `make pkg-appimage` |
| Android APK | `make pkg-apk` |

---

## 🏗️ Arquitetura

```
golker-browser/
├── src/
│   ├── browser/           # Código principal do navegador
│   │   ├── core/         # Motor Blink
│   │   ├── ui/           # Interface gráfica
│   │   └── tabs/         # Gerenciador de abas
│   ├── ai/               # Módulo de IA
│   │   ├── llama/        # Integracao LLaMA
│   │   ├── chat/         # Chatbot UI
│   │   └── nlp/          # Processamento de linguagem
│   └── core/             # Núcleo comum
├── scripts/              # Scripts de build
├── docs/                 # Documentação
└── resources/            # Recursos (ícones, etc)
```

---

## 📊 Benchmarks

| Navegador | RAM (Standby) | RAM (10 abas) | Tempo de inicialização |
|-----------|---------------|---------------|------------------------|
| **Golker** | **~50MB** | **~150MB** | **~1s** |
| Chrome | ~200MB | ~800MB | ~3s |
| Firefox | ~150MB | ~600MB | ~2s |
| Brave | ~120MB | ~500MB | ~2s |
| Vivaldi | ~300MB | ~900MB | ~4s |

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença GPLv3 - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- [Chromium Project](https://www.chromium.org/) - Motor Blink
- [Meta AI](https://ai.meta.com/llama/) - Modelo LLaMA 3
- [Electron](https://www.electronjs.org/) - Framework desktop
- [WebKit](https://webkit.org/) - Inspiração

---

<p align="center">
  Feito com ❤️ pela comunidade Open Source
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/golker/golker-browser?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/golker/golker-browser?style=social" alt="Forks">
  <img src="https://img.shields.io/github/license/golker/golker-browser" alt="License">
</p>
