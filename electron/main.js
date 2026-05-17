const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initDatabase, getTodosByDate, addTodo, toggleTodo, deleteTodo } = require('./database');

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 600,
    minWidth: 360,
    minHeight: 480,
    backgroundColor: '#FFF9E6',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(async () => {
  await initDatabase();

  ipcMain.handle('get-todos', (_, date) => getTodosByDate(date));
  ipcMain.handle('add-todo', (_, content, date) => addTodo(content, date));
  ipcMain.handle('toggle-todo', (_, id, isDone) => toggleTodo(id, isDone));
  ipcMain.handle('delete-todo', (_, id) => deleteTodo(id));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
