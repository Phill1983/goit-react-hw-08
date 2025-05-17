import css from './ActionButton.module.css';

export default function ActionButton({ label, onClick, variant = 'default' }) {
  return (
    <button
      onClick={onClick}
      className={`${css.button} ${css[variant]}`}
      type="button"
    >
      {label}
    </button>
  );
}

