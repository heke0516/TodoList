const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    minWidth: '260px',
    textAlign: 'center',
  },
  message: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  cancelBtn: {
    padding: '8px 20px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-hover)',
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
  confirmBtn: {
    padding: '8px 20px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'var(--accent)',
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
};

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button style={styles.cancelBtn} onClick={onCancel}>取消</button>
          <button style={styles.confirmBtn} onClick={onConfirm}>确定</button>
        </div>
      </div>
    </div>
  );
}
