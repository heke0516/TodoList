import { useEffect } from 'react';
import TodoItem from './TodoItem';

const styles = {
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
};

export default function TodoList({ todos, onToggle, onDelete, loadTodos }) {
  useEffect(() => {
    loadTodos();
  }, []);

  if (todos.length === 0) {
    return (
      <div style={styles.list}>
        <p style={styles.empty}>还没有待办事项，添加一条吧！</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
