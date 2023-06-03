import './Subtask.css'
import { URL } from '../../../contants/url'

// Not neccessary to wrap this component inside memo as
// its high probabilty that there would be fewer subtasks
// and updating a subtask would only rerender other subtasks
// of same task
const Subtask = ({ subtask, categoryid, dispatch, setLoading }) => {
  const completeSubtask = async (id, taskid, categoryid, e) => {
    setLoading(true)

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, taskid, categoryid }),
    }
    const response = await fetch(`${URL}/subtasks`, requestOptions)
    const { data } = await response.json()
    console.log('data : ', data)
    console.log('id : ', id, taskid, categoryid)
    setTimeout(() => {
      setLoading(false)
      dispatch({
        type: 'completeSubtask',
        payload: { id, taskid, categoryid },
      })
    }, 2000)
  }
  console.log('subtask : ', subtask.id)

  return (
    <div>
      <span>{subtask.name + ' '}</span>
      <button
        onClick={() => {
          completeSubtask(subtask.id, subtask.taskid, categoryid)
        }}
      >
        complete
      </button>
    </div>
  )
}

export default Subtask
