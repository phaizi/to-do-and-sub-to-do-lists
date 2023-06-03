import { useState, useEffect, useReducer } from 'react'
import HeaderDesign from './components/uiBasedComponents/HeaderDesign/HeaderDesign'
import ItemTodo from './components/uiBasedComponents/ItemTodo/ItemTodo'
import './App.css'
import Loader from './components/uiBasedComponents/Loader/Loader'
import Category from './components/mainComponents/Category/Category'
import reducer from './reducer/reducer'
import { URL } from './contants/url'

const App = () => {
  const [todoState, dispatch] = useReducer(reducer, [])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await fetch(`${URL}/categories`)
        const data = await response.json()
        console.log(data.data)

        setTimeout(() => {
          dispatch({ type: 'getAllData', payload: data.data })
          setLoading(false)
        }, 2000)
      } catch (error) {
        setError(error)
      } finally {
        // setLoading(false)
      }
    })()
  }, [])

  // temporary state and will be removed
  const [isTaskCompleted, setTaskCompleted] = useState(false)

  const onTaskComplete = (taskId, taskName) => {
    // request to server and then update the isCompleted state
    setTaskCompleted(true)
  }
  return (
    <div className="App">
      {loading && <Loader />}
      <HeaderDesign />
      To do list
      {todoState.map((category) => (
        <Category
          key={category.id}
          category={category}
          dispatch={dispatch}
          setLoading={setLoading}
        />
      ))}
      <ItemTodo
        taskName={'my first task'}
        isCompleted={isTaskCompleted}
        onComplete={onTaskComplete}
      />
    </div>
  )
}

export default App
