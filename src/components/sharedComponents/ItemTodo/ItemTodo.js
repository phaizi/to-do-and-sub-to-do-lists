import './ItemTodo.css'
import Checkbox from '../Checkbox/Checkbox'

const ItemTodo = ({ taskId, taskName, isCompleted, onComplete }) => {
  const onSelect = () => {
    onComplete(taskId, taskName)
  }
  return (
    <div className="todoContainer">
      <Checkbox
        id={taskId}
        checked={isCompleted}
        disabled={isCompleted}
        onChange={onSelect}
      />

      <label
        className={isCompleted ? 'label labelDeleted' : 'Label'}
        htmlFor={taskId}
      >
        {taskName}
      </label>
    </div>
  )
}

export default ItemTodo
