import styles from './ActionButton.module.css';

export default function ActionButton({ label, variant = 'default', onClick, fullWidth = false }) {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.full : '',
  ].join(' ');

  return (
    <button className={classNames} onClick={onClick}>
      {label}
    </button>
  );
}
