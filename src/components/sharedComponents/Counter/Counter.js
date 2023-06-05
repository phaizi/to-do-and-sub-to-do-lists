import './Counter.css'

const Counter = ({ count = 0, className }) => {
  const classes = `counter ${className}`
  return <i className={classes}>{count}</i>
}

export default Counter
