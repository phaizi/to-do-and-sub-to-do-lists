import './Button.css'

const Button = ({ disabled = false, children, onSubmit, style }) => {
  return (
    <button
      className="button"
      disabled={disabled}
      onClick={onSubmit}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
