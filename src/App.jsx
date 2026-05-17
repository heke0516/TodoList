import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DateQuery from './components/DateQuery';
import './App.css';

function getToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function App() {
  const [view, setView] = useState('today'); // 'today' | 'query'
  const [todos, setTodos] = useState([]);
  const today = getToday();

  const loadTodos = async (date) => {
    const result = await window.api.getTodos(date);
    setTodos(result);
  };

  const handleAdd = async (content) => {
    await window.api.addTodo(content, today);
    await loadTodos(today);
  };

  const handleToggle = async (id, currentIsDone) => {
    await window.api.toggleTodo(id, currentIsDone ? 0 : 1);
    await loadTodos(view === 'today' ? today : null);
  };

  const handleDelete = async (id) => {
    await window.api.deleteTodo(id);
    await loadTodos(view === 'today' ? today : null);
  };

  if (view === 'query') {
    return (
      <div className="app">
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
      <div className="header">
        <h1>📋 我的待办</h1>
        <a onClick={() => setView('query')}>📅 查询历史</a>
      </div>
      <TodoInput onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        loadTodos={() => loadTodos(today)}
      />
    </div>
  );
}
