import { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-card)',
    fontSize: '14px',
    color: 'var(--text-primary)',
    outline: 'none',
  },
  button: {
    backgroundColor: 'var(--accent)',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '6px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
};

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="添加今天的待办..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button style={styles.button} onClick={handleSubmit}>添加</button>
    </div>
  );
}
