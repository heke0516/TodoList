import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const styles = {
  item: {
    padding: '10px 12px',
    borderBottom: '1px solid #F0E6C0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  itemDone: {
    backgroundColor: 'var(--bg-done)',
  },
  text: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    flex: 1,
  },
  textDone: {
    textDecoration: 'line-through',
    color: 'var(--text-done)',
  },
  deleteBtn: {
    color: 'var(--text-delete)',
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: '4px',
    marginLeft: '8px',
  },
};

export default function TodoItem({ todo, onToggle, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    onToggle(todo.id, todo.is_done);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    onDelete(todo.id);
  };

  return (
    <>
      <div
        style={{
          ...styles.item,
          ...(todo.is_done ? styles.itemDone : {}),
        }}
        onClick={handleClick}
      >
        <span style={{
          ...styles.text,
          ...(todo.is_done ? styles.textDone : {}),
        }}>
          {todo.is_done ? '✓' : '☐'} {todo.content}
        </span>
        <button style={styles.deleteBtn} onClick={handleDelete} title="删除">
          ✕
        </button>
      </div>
      {showConfirm && (
        <ConfirmDialog
          message="确定删除这条待办？"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
