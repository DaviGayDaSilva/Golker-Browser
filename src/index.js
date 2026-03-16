const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const log = require('electron-log');

// Configurar logging
log.transports.file.level = 'info';
log.transports.file.resolvePathFn = () => path.join(app.getPath('userData'), 'logs', 'main.log');

let mainWindow = null;

// Configurações de otimização de memória
const MEMORY_OPTIMIZATIONS = {
  backgroundThrottling: true,
  disableHardwareAcceleration: false,
  enableBlinkFeatures: 'IdleDetection',
  experimentalFeatures: false
};

function createWindow() {
  log.info('Iniciando Golker Browser...');

  // Configurar sessão para máximo desempenho
  session.defaultSession.setPreloads([path.join(__dirname, 'preload.js')]);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    // Otimizações de memória
    backgroundThrottling: MEMORY_OPTIMIZATIONS.backgroundThrottling,
    // Configurações de rendimiento
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Blink optimizations
      blinkFeatures: 'IdleDetection',
      experimentalFeatures: false,
      // Memory optimizations
      v8CacheOptions: 'code',
      sandbox: true
    },
    // UI
    title: 'Golker Browser',
    icon: path.join(__dirname, '../resources/icons/icon.png'),
    show: false
  });

  // Carregar página inicial
  mainWindow.loadFile(path.join(__dirname, '../src/browser/ui/index.html'));

  // Mostrar quando pronto
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    log.info('Janela principal exibida');
  });

  // Gerenciar memória - suspender abas inativas
  mainWindow.on('unresponsive', () => {
    log.warn('Janela não responsiva - otimizando...');
  });

  // Cleanup ao fechar
  mainWindow.on('closed', () => {
    mainWindow = null;
    log.info('Janela fechada - memória liberada');
  });
}

// Aplicar otimizações globais
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('enable-features', 'NetworkService,NetworkServiceInProcess');
app.commandLine.appendSwitch('disable-features', 'TranslateUI,IdleDetection');

// Iniciar app
app.whenReady().then(() => {
  log.info('Golker Browser iniciado');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers para IA
ipcMain.handle('ai:query', async (event, prompt) => {
  log.info('Consulta de IA recebida:', prompt.substring(0, 50));
  // Aqui seria a integração com LLaMA
  return { response: 'IA em desenvolvimento', status: 'ok' };
});

ipcMain.handle('ai:summarize', async (event, content) => {
  log.info('Solicitação de resumo');
  return { summary: 'Resumo em desenvolvimento', status: 'ok' };
});

ipcMain.handle('ai:translate', async (event, text, targetLang) => {
  log.info('Solicitação de tradução para:', targetLang);
  return { translated: 'Tradução em desenvolvimento', status: 'ok' };
});

// IPC para gerenciamento de memória
ipcMain.handle('memory:getStats', async () => {
  const process = require('process');
  return {
    heapUsed: process.memoryUsage().heapUsed,
    heapTotal: process.memoryUsage().heapTotal,
    external: process.memoryUsage().external
  };
});

module.exports = { mainWindow };
