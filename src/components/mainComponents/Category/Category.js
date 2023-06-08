import { memo, useRef, useState } from 'react'
import Task from '../Task/Task'
import './Category.css'
import { ReactComponent as FolderIcon } from '../../../assets/folder-icon.svg'
import Counter from '../../sharedComponents/Counter/Counter'
import InputField from '../../sharedComponents/InputField/InputField'
import NumberField from '../../sharedComponents/NumberField/NumberField'
import Button from '../../sharedComponents/Button/Button'

const URL = process.env.REACT_APP_URL

const Category = ({ category, dispatch, setLoading, setError }) => {
  const taskDivRef = useRef(null)
  const [taskName, setTaskName] = useState('')
  const [dueDays, setDueDays] = useState('')
  const [isTaskDisplay, setTaskDisplay] = useState(false)
  const [taskDivHeight, setTaskDivHeight] = useState(0)
  const count = category.Tasks.length

  const onTaskNameChange = (e) => {
    setTaskName(e.currentTarget.value)
  }
  const onDueDaysChange = (e) => {
    if (e.currentTarget.value >= 0) {
      setDueDays(e.currentTarget.value)
    }
  }

  const createTaskHandler = async (e) => {
    e.preventDefault()
    if (taskName) {
      const newTask = {
        name: taskName,
        categoryid: category.id,
        isCompleted: false,
        daysRemaining: dueDays ? dueDays : 0,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      }
      setLoading(true)
      try {
        const response = await fetch(`${URL}/tasks`, requestOptions)
        const jsonData = await response.json()
        if (jsonData.status === 'success') {
          jsonData.data.Subtasks = jsonData.data.Subtasks || []
          dispatch({ type: 'createTask', payload: jsonData.data })
          setLoading(false)
          setTimeout(() => {
            // scrollHeight was not updating on creation
            // of new task and also not on running useEffect.
            // so had to put a pause here so that scrollHeight
            // gets updated in mean while.
            setTaskDivHeight(taskDivRef.current?.scrollHeight)
            setDueDays('')
            setTaskName('')
          }, 0)
        } else {
          setLoading(false)
          setError(jsonData.message)
          setDueDays('')
          setTaskName('')
        }
      } catch (err) {
        setLoading(false)
        setError(err.toString())
        setDueDays('')
        setTaskName('')
      }
    }
  }

  const toggleTasks = () => {
    setTaskDivHeight(isTaskDisplay ? 0 : taskDivRef.current?.scrollHeight)
    setTaskDisplay((state) => !state)
  }

  return (
    <section
      style={{
        maxWidth: 800,
        margin: 'auto',
        marginBottom: 40,
      }}
    >
      <div style={{ margin: '0px 20px' }}>
        <button
          className="categoryContainer"
          onClick={toggleTasks}
          tabIndex={category.id}
        >
          <FolderIcon className="folderIcon" />
          <span className="categoryHeading">{category.name}</span>
          {!isTaskDisplay && <Counter className="taskCounter" count={count} />}
          <i className="arrow" />
          <hr className="line" />
        </button>
      </div>
      <div
        ref={taskDivRef}
        style={{ height: taskDivHeight }}
        className={isTaskDisplay ? 'showTasks' : 'hideTasks'}
      >
        <form
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '9.57209px 17.4038px',
          }}
        >
          <InputField
            placeHolder="Write a task..."
            value={taskName}
            onChange={onTaskNameChange}
          />
          <NumberField
            style={{ marginLeft: 8.7, marginBottom: 10 }}
            value={dueDays}
            onChange={onDueDaysChange}
          />
          <Button
            onSubmit={createTaskHandler}
            style={{ marginLeft: 8.7, marginBottom: 10 }}
            disabled={!taskName}
          >
            Create
          </Button>
        </form>

        {category.Tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            dispatch={dispatch}
            setTaskDivHeight={setTaskDivHeight}
            taskDivRef={taskDivRef}
            setLoading={setLoading}
            setError={setError}
          />
        ))}
      </div>
    </section>
  )
}

export default memo(Category)
