import { ReactComponent as CloseIcon } from '../../../assets/close-icon.svg'
import './ErrorBar.css'

const ErrorBar = ({ errorMessage, onClose }) => {
  return (
    <div className="errorBar">
      <div className="box" />
      <div className="content">
        <h3 className="errorHeading">Error</h3>
        <p className="errorMessage">{errorMessage}</p>
      </div>
      <button className="closeButton" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default ErrorBar
