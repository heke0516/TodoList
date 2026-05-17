import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DateQuery from './components/DateQuery';
import { getToday } from './utils/date';
import './App.css';

function TitleBar() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    window.electronAPI?.isPinned().then(setPinned);
  }, []);

  const handleTogglePin = async () => {
    const result = await window.electronAPI?.togglePin();
    setPinned(result);
  };

  return (
    <div className="titlebar">
      <span className="titlebar-title">ToDoList</span>
      <div className="titlebar-controls">
        <button
          className={`titlebar-btn pin${pinned ? ' active' : ''}`}
          onClick={handleTogglePin}
          title={pinned ? '取消置顶' : '窗口置顶'}
        >
          📌
        </button>
        <button className="titlebar-btn" onClick={() => window.electronAPI?.minimize()}>─</button>
        <button className="titlebar-btn" onClick={() => window.electronAPI?.maximize()}>□</button>
        <button className="titlebar-btn close" onClick={() => window.electronAPI?.close()}>✕</button>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('today'); // 'today' | 'query'
  const [todos, setTodos] = useState([]);
  const today = getToday();

  useEffect(() => {
    loadTodos(today);
  }, []);

  const loadTodos = async (date) => {
    const result = await window.api.getTodos(date);
    setTodos(result);
  };

  const handleAdd = async (content) => {
    const newTodo = await window.api.addTodo(content, today);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggle = async (id, currentIsDone) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_done: currentIsDone ? 0 : 1 } : t))
    );
    window.api.toggleTodo(id, currentIsDone ? 0 : 1);
  };

  const handleDelete = async (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    window.api.deleteTodo(id);
  };

  if (view === 'query') {
    return (
      <div className="app">
        <TitleBar />
        <DateQuery
          onBack={() => {
            setView('today');
            loadTodos(today);
          }}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <TitleBar />
      <div className="header">
        <h1>📋 我的待办</h1>
        <a onClick={() => setView('query')}>📅 查询历史</a>
      </div>
      <TodoInput onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
