const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTodos: (date) => ipcRenderer.invoke('get-todos', date),
  addTodo: (content, date) => ipcRenderer.invoke('add-todo', content, date),
  toggleTodo: (id, isDone) => ipcRenderer.invoke('toggle-todo', id, isDone),
  deleteTodo: (id) => ipcRenderer.invoke('delete-todo', id),
});

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),
  togglePin: () => ipcRenderer.invoke('window-toggle-pin'),
  isPinned: () => ipcRenderer.invoke('window-is-pinned'),
});
