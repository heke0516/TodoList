const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const { initDatabase, getTodosByDate, addTodo, toggleTodo, deleteTodo } = require('./database');

let mainWindow;
let tray = null;
let isQuitting = false;

const STATE_FILE = path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

function saveWindowState() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  if (mainWindow.isMinimized() || mainWindow.isMaximized()) return;
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(mainWindow.getBounds()));
  } catch {}
}

function createWindow() {
  const saved = loadWindowState();

  const defaults = { width: 480, height: 600 };
  const opts = saved
    ? { x: saved.x, y: saved.y, width: saved.width, height: saved.height }
    : defaults;

  mainWindow = new BrowserWindow({
    ...opts,
    minWidth: 360,
    minHeight: 400,
    frame: false,
    backgroundColor: '#FFF9E6',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on('resize', saveWindowState);
  mainWindow.on('move', saveWindowState);

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  tray.setToolTip('ToDoList');

  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => { mainWindow.show(); mainWindow.focus(); } },
    { type: 'separator' },
    { label: '退出', click: () => { isQuitting = true; app.quit(); } },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
    }
  });
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

  ipcMain.handle('window-toggle-pin', () => {
    const current = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(!current);
    return !current;
  });
  ipcMain.handle('window-is-pinned', () => mainWindow.isAlwaysOnTop());

  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
