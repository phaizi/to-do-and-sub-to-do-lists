import { memo } from 'react'
import './Task.css'
import Subtask from '../Subtask/Subtask'
import { URL } from '../../../contants/url'

const Task = ({ task, dispatch, setLoading }) => {
  const completeTask = async (id, categoryid, e) => {
    setLoading(true)
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
      setLoading(false)
      dispatch({
        type: 'completeTask',
        payload: { id, categoryid },
      })
    }, 2000)
  }
  console.log('Renrender tasks = ', task.name)
  // console.log('usememo : ', task.id)
  return (
    <div>
      <h3>{task.name}</h3>
      <div>{task.isCompleted}</div>
      <button
        onClick={() => {
          completeTask(task.id, task.categoryid)
        }}
      >
        complete
      </button>
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
  )
}

export default memo(Task)
