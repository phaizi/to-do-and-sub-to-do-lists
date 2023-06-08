import { memo, useState } from 'react'
import './Task.css'
import Subtask from '../Subtask/Subtask'
import ItemTodo from '../../sharedComponents/ItemTodo/ItemTodo'
import DueDays from '../../sharedComponents/DueDays/DueDays'
import InputField from '../../sharedComponents/InputField/InputField'
import Button from '../../sharedComponents/Button/Button'

const URL = process.env.REACT_APP_URL

const Task = ({
  task,
  dispatch,
  setLoading,
  setError,
  setTaskDivHeight,
  taskDivRef,
}) => {
  const [subtaskName, setSubtaskName] = useState('')

  const createSubtaskHandler = async (e) => {
    e.preventDefault()
    if (subtaskName) {
      const newSubTask = {
        name: subtaskName,
        taskid: task.id,
        isCompleted: false,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubTask),
      }
      setLoading(true)
      try {
        const response = await fetch(`${URL}/subtasks`, requestOptions)
        const jsonData = await response.json()
        if (jsonData.status === 'success') {
          jsonData.data.Subtasks = jsonData.data.Subtasks || []
          setLoading(false)
          dispatch({
            type: 'createSubtask',
            payload: { categoryid: task.categoryid, subtask: jsonData.data },
          })
          setTimeout(() => {
            // scrollHeight was not updating on creation
            // of new task and also not on running useEffect.
            // so had to put a pause here so that scrollHeight
            // gets updated in mean while.
            setTaskDivHeight(taskDivRef.current?.scrollHeight)
            setSubtaskName('')
          }, 0)
        } else {
          setLoading(false)
          setError(jsonData.message)
          setSubtaskName('')
        }
      } catch (err) {
        setLoading(false)
        setError(err.toString())
        setSubtaskName('')
      }
    }
  }
  const completeTask = async (id, categoryid, e) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    setLoading(true)
    try {
      const response = await fetch(`${URL}/tasks`, requestOptions)
      const jsonData = await response.json()
      if (jsonData.status === 'success') {
        setLoading(false)
        dispatch({
          type: 'completeTaskAndAllSubtasks',
          payload: { taskid: id, categoryid },
        })
      } else {
        setLoading(false)
        setError(jsonData.message)
      }
    } catch (err) {
      setLoading(false)
      setError(err.toString())
    }
  }

  const onSubtaskNameChange = (e) => {
    setSubtaskName(e.currentTarget.value)
  }
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
      {task.isCompleted || (
        <form className="form">
          <InputField
            placeHolder="Write a subtask..."
            value={subtaskName}
            onChange={onSubtaskNameChange}
          />
          <Button
            disabled={!subtaskName}
            onSubmit={createSubtaskHandler}
            style={{ marginLeft: 8.7, marginBottom: 10 }}
          >
            Create
          </Button>
        </form>
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
              setError={setError}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(Task)
