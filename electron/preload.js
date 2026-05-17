const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTodos: (date) => ipcRenderer.invoke('get-todos', date),
  addTodo: (content, date) => ipcRenderer.invoke('add-todo', content, date),
  toggleTodo: (id, isDone) => ipcRenderer.invoke('toggle-todo', id, isDone),
  deleteTodo: (id) => ipcRenderer.invoke('delete-todo', id),
});
