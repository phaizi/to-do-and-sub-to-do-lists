import ItemTodo from '../../sharedComponents/ItemTodo/ItemTodo'
import './Subtask.css'

const URL = process.env.REACT_APP_URL

// Not neccessary to wrap this component inside memo as
// its high probabilty that there would be fewer subtasks
// and updating a subtask would only rerender other subtasks
// of same task
const Subtask = ({ subtask, categoryid, dispatch, setLoading, setError }) => {
  const completeSubtask = async (id, taskid, categoryid, e) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    setLoading(true)
    try {
      const response = await fetch(`${URL}/subtasks`, requestOptions)
      const jsonData = await response.json()
      if (jsonData.status === 'success') {
        setLoading(false)
        dispatch({
          type: 'completeSubtask',
          payload: { subtaskid: id, taskid, categoryid },
        })
        if (jsonData.data.hasMainTaskUpdated) {
          dispatch({
            type: 'completeTask',
            payload: { taskid, categoryid },
          })
        }
      } else {
        setLoading(false)
        setError(jsonData.message)
      }
    } catch (err) {
      setLoading(false)
      setError(err.toString())
    }
  }

  return (
    <ItemTodo
      taskId={subtask.id}
      taskName={subtask.name}
      isCompleted={subtask.isCompleted}
      onComplete={(e) => {
        completeSubtask(subtask.id, subtask.taskid, categoryid, e)
      }}
    />
  )
}

export default Subtask
