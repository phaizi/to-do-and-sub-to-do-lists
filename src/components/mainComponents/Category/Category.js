import { memo } from 'react'
import Task from '../Task/Task'
import './Category.css'

const Category = ({ category, dispatch, setLoading }) => {
  console.log('RERENDERING category = ', category.name)
  return (
    <div>
      <h1>{category.name}</h1>
      {category.Tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          dispatch={dispatch}
          setLoading={setLoading}
        />
      ))}
    </div>
  )
}

export default memo(Category)
