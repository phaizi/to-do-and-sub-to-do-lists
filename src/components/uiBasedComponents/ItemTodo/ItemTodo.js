import { useState } from 'react'
import './ItemTodo.css'

const ItemTodo = ({ taskId, taskName, isCompleted, onComplete }) => {
  const [isHovered, setHovered] = useState(false)
  const toggleHover = () => {
    if (isCompleted) {
      setHovered(false)
    } else {
      setHovered((state) => !state)
    }
  }

  const onSelect = () => {
    onComplete(taskId, taskName)
    setHovered(false)
  }
  return (
    <div className="TodoContainer">
      <input
        id={taskId}
        className={`Checkbox ${isHovered && 'CheckboxHovered'}`}
        type="checkbox"
        checked={isCompleted}
        disabled={isCompleted}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onFocus={toggleHover}
        onBlur={toggleHover}
        onClick={onSelect}
      />
      <label
        className={isCompleted ? 'Label LabelDeleted' : 'Label'}
        for={taskId}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={onSelect}
      >
        {taskName}
      </label>
    </div>
  )
}

export default ItemTodo
