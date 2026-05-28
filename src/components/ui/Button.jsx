export default function Button({ variant = 'primary', onClick, disabled, style, children, ...props }) {
  const base = {
    fontSize: 13, borderRadius: 0, fontFamily: 'inherit',
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: '10px 16px',
  }
  const styles = {
    primary: {
      fontWeight: 600,
      background: 'var(--btn-bg)', color: 'var(--btn-fg)',
      border: '2px solid var(--btn-bd)',
      boxShadow: 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 var(--btn-bd)',
    },
    secondary: {
      fontWeight: 400,
      background: 'transparent', color: 'var(--c-muted)',
      border: '1px solid #6a4820',
    },
  }
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...base, ...styles[variant], ...style }}
      {...props}>
      {children}
    </button>
  )
}
