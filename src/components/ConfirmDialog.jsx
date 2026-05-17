export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <p className="dialog-message">{message}</p>
        <div className="dialog-buttons">
          <button className="dialog-btn-cancel" onClick={onCancel}>取消</button>
          <button className="dialog-btn-confirm" onClick={onConfirm}>确定</button>
        </div>
      </div>
    </div>
  );
}
