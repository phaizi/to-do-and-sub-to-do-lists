import './InputField.css'

const InputField = ({ placeHolder, value, onChange }) => {
  return (
    <div className="inputContainer">
      <input className="inputFieldCheck" type="checkbox" disabled />
      <input
        className="inputField"
        placeHolder={placeHolder}
        value={value}
        onChange={onChange}
        type="text"
      />
    </div>
  )
}

export default InputField
