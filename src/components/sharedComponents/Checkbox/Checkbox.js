import './Checkbox.css'

const Checkbox = ({ id, checked, disabled, onChange }) => {
  return (
    <input
      id={id}
      className="Checkbox"
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default Checkbox
