import { useState } from 'react'
import HeaderDesign from './components/uiBasedComponents/HeaderDesign/HeaderDesign'
import ItemTodo from './components/uiBasedComponents/ItemTodo/ItemTodo'
import './App.css'

const App = () => {
  // temporary state and will be removed
  const [isTaskCompleted, setTaskCompleted] = useState(false)

  const onTaskComplete = (taskId, taskName) => {
    // request to server and then update the isCompleted state
    setTaskCompleted(true)
  }
  return (
    <div className="App">
      <HeaderDesign />
      To do list
      <ItemTodo
        taskName={'my first task'}
        isCompleted={isTaskCompleted}
        onComplete={onTaskComplete}
      />
    </div>
  )
}

export default App
