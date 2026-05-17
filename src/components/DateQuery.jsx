import { useState } from 'react';
import TodoItem from './TodoItem';
import { getToday } from '../utils/date';

export default function DateQuery({ onBack }) {
  const [date, setDate] = useState(getToday());
  const [todos, setTodos] = useState([]);
  const [queried, setQueried] = useState(false);

  const handleQuery = async () => {
    const result = await window.api.getTodos(date);
    setTodos(result);
    setQueried(true);
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

  const doneCount = todos.filter((t) => t.is_done).length;

  return (
    <div>
      <div className="date-query-header">
        <h1 className="date-query-title">📅 查询历史待办</h1>
        <a className="date-query-back" onClick={onBack}>← 返回今天</a>
      </div>

      <div className="date-query-row">
        <label className="date-query-label">选择日期：</label>
        <input
          type="date"
          className="date-query-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="date-query-btn" onClick={handleQuery}>查询</button>
      </div>

      {queried && (
        <>
          <div className="date-query-list">
            {todos.length === 0 ? (
              <p className="date-query-empty">该日期没有待办记录</p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
          {todos.length > 0 && (
            <p className="date-query-summary">
              共 {todos.length} 项，已完成 {doneCount} 项
            </p>
          )}
        </>
      )}
    </div>
  );
}
