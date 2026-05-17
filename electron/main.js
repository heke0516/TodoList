const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initDatabase, getTodosByDate, addTodo, toggleTodo, deleteTodo } = require('./database');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 600,
    frame: false,
    backgroundColor: '#FFF9E6',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(async () => {
  await initDatabase();

  ipcMain.handle('get-todos', (_, date) => getTodosByDate(date));
  ipcMain.handle('add-todo', (_, content, date) => addTodo(content, date));
  ipcMain.handle('toggle-todo', (_, id, isDone) => toggleTodo(id, isDone));
  ipcMain.handle('delete-todo', (_, id) => deleteTodo(id));

  ipcMain.handle('window-minimize', () => mainWindow?.minimize());
  ipcMain.handle('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.handle('window-close', () => mainWindow?.close());

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
