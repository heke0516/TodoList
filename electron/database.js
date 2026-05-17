const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

let db;
let dbPath;

async function initDatabase() {
  const SQL = await initSqlJs();
  dbPath = path.join(app.getPath('userData'), 'todos.db');

  let buffer = null;
  if (fs.existsSync(dbPath)) {
    buffer = fs.readFileSync(dbPath);
  }

  db = buffer ? new SQL.Database(buffer) : new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      is_done INTEGER DEFAULT 0,
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  saveDatabase();
  return db;
}

function saveDatabase() {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function getTodosByDate(date) {
  const stmt = db.prepare('SELECT * FROM todos WHERE date = ? ORDER BY is_done ASC, created_at ASC');
  stmt.bind([date]);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function addTodo(content, date) {
  db.run('INSERT INTO todos (content, date) VALUES (?, ?)', [content, date]);
  const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
  saveDatabase();
  return { id, content, is_done: 0, date };
}

function toggleTodo(id, isDone) {
  db.run('UPDATE todos SET is_done = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [isDone, id]);
  saveDatabase();
}

function deleteTodo(id) {
  db.run('DELETE FROM todos WHERE id = ?', [id]);
  saveDatabase();
}

module.exports = { initDatabase, getTodosByDate, addTodo, toggleTodo, deleteTodo };
