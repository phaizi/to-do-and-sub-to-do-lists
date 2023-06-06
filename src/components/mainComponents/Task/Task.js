import { memo } from 'react'
import './Task.css'
import Subtask from '../Subtask/Subtask'
import ItemTodo from '../../sharedComponents/ItemTodo/ItemTodo'
import DueDays from '../../sharedComponents/DueDays/DueDays'
import { URL } from '../../../contants/url'

const Task = ({ task, dispatch, setLoading }) => {
  const completeTask = async (id, categoryid, e) => {
    // setLoading(true)
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    const response = await fetch(`${URL}/tasks`, requestOptions)
    const { data } = await response.json()
    console.log('data : ', data)
    console.log('id : ', id, categoryid)
    setTimeout(() => {
      // setLoading(false)
      dispatch({
        type: 'completeTaskAndAllSubtasks',
        payload: { taskid: id, categoryid },
      })
    }, 2000)
  }
  console.log('Renrender tasks = ', task.name)
  // console.log('usememo : ', task.id)
  return (
    <div className="taskContainer">
      <ItemTodo
        taskId={task.id}
        taskName={task.name}
        isCompleted={task.isCompleted}
        onComplete={(e) => {
          completeTask(task.id, task.categoryid, e)
        }}
      />
      {task.daysRemaining > 0 && (
        <DueDays
          className="dueDays"
          text={`Due in ${task.daysRemaining} days`}
        />
      )}
      {task.Subtasks?.length > 0 && (
        <div className="subtasksContainer">
          {task.Subtasks.map((subtask) => (
            <Subtask
              key={subtask.id}
              subtask={subtask}
              categoryid={task.categoryid}
              dispatch={dispatch}
              setLoading={setLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(Task)
