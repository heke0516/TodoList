import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

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
        className={`todo-item${todo.is_done ? ' todo-item--done' : ''}`}
        onClick={handleClick}
      >
        <span className={`todo-item-text${todo.is_done ? ' todo-item-text--done' : ''}`}>
          {todo.is_done ? '✓' : '☐'} {todo.content}
        </span>
        <button className="todo-item-delete" onClick={handleDelete} title="删除">
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
