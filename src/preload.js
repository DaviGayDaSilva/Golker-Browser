const { contextBridge, ipcRenderer } = require('electron');

// Expor APIs seguras para o renderer
contextBridge.exposeInMainWorld('golker', {
  // IA
  ai: {
    query: (prompt) => ipcRenderer.invoke('ai:query', prompt),
    summarize: (content) => ipcRenderer.invoke('ai:summarize', content),
    translate: (text, targetLang) => ipcRenderer.invoke('ai:translate', text, targetLang)
  },
  
  // Memória
  memory: {
    getStats: () => ipcRenderer.invoke('memory:getStats')
  },
  
  // Navegador
  browser: {
    openTab: (url) => ipcRenderer.invoke('browser:openTab', url),
    closeTab: (tabId) => ipcRenderer.invoke('browser:closeTab', tabId),
    getTabs: () => ipcRenderer.invoke('browser:getTabs')
  },
  
  // Utilitários
  platform: process.platform,
  version: '1.0.0'
});

console.log('Golker Browser preload carregado');
