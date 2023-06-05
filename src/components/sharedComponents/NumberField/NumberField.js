import './NumberField.css'

const NumberField = ({ value, onChange, style }) => {
  return (
    <input
      className="numberField"
      placeHolder={'Enter due days...'}
      type="number"
      value={value}
      onChange={onChange}
      style={style}
    />
  )
}

export default NumberField
