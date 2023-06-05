import './ItemTodo.css'
import Checkbox from '../Checkbox/Checkbox'

const ItemTodo = ({ taskId, taskName, isCompleted, onComplete }) => {
  const onSelect = () => {
    onComplete(taskId, taskName)
  }
  return (
    <div className="TodoContainer">
      <Checkbox
        id={taskId}
        checked={isCompleted}
        disabled={isCompleted}
        onChange={onSelect}
      />

      <label
        className={isCompleted ? 'Label LabelDeleted' : 'Label'}
        htmlFor={taskId}
        onClick={onSelect}
      >
        {taskName}
      </label>
    </div>
  )
}

export default ItemTodo
