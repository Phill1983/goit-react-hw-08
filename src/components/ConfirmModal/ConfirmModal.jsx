import css from './ConfirmModal.module.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <p className={css.message}>{message}</p>
        <div className={css.actions}>
          <button className={css.confirm} onClick={onConfirm}>Yes</button>
          <button className={css.cancel} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
