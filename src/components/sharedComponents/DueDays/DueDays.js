import { ReactComponent as CalendarIcon } from '../../../assets/calendar-icon.svg'
import './DueDays.css'

const DueDays = ({ text, className }) => {
  return (
    <div className={className}>
      <CalendarIcon className="calendarIcon" />
      <span className="dueDaysText">{text}</span>
    </div>
  )
}

export default DueDays
