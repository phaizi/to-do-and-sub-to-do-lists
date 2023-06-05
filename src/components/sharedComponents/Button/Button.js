import './Button.css'

const Button = ({ children, onSubmit, style }) => {
  return (
    <button className="button" onClick={onSubmit} style={style}>
      {children}
    </button>
  )
}

export default Button
