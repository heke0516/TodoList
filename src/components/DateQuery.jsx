import { useState } from 'react';
import TodoItem from './TodoItem';
import ConfirmDialog from './ConfirmDialog';

function getToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    color: 'var(--text-primary)',
  },
  backLink: {
    color: 'var(--text-secondary)',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  queryRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '16px',
  },
  label: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
  },
  dateInput: {
    padding: '8px 12px',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-card)',
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
  queryBtn: {
    backgroundColor: 'var(--accent)',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
  list: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  empty: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--text-secondary)',
    fontSize: '14px',
  },
  summary: {
    marginTop: '12px',
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
};

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
    await window.api.toggleTodo(id, currentIsDone ? 0 : 1);
    await handleQuery();
  };

  const handleDelete = async (id) => {
    await window.api.deleteTodo(id);
    await handleQuery();
  };

  const doneCount = todos.filter((t) => t.is_done).length;

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>📅 查询历史待办</h1>
        <a style={styles.backLink} onClick={onBack}>← 返回今天</a>
      </div>

      <div style={styles.queryRow}>
        <label style={styles.label}>选择日期：</label>
        <input
          type="date"
          style={styles.dateInput}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button style={styles.queryBtn} onClick={handleQuery}>查询</button>
      </div>

      {queried && (
        <>
          <div style={styles.list}>
            {todos.length === 0 ? (
              <p style={styles.empty}>该日期没有待办记录</p>
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
            <p style={styles.summary}>
              共 {todos.length} 项，已完成 {doneCount} 项
            </p>
          )}
        </>
      )}
    </div>
  );
}
