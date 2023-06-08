import { useState, useEffect, useReducer } from 'react'
import HeaderDesign from './components/sharedComponents/HeaderDesign/HeaderDesign'
import './App.css'
import Loader from './components/sharedComponents/Loader/Loader'
import Category from './components/mainComponents/Category/Category'
import ErrorBar from './components/sharedComponents/ErrorBar/ErrorBar'
import reducer from './reducer/reducer'

const URL = process.env.REACT_APP_URL

const App = () => {
  const [todoState, dispatch] = useReducer(reducer, [])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await fetch(`${URL}/categories`)
        const jsonData = await response.json()
        if (jsonData.status === 'success') {
          dispatch({ type: 'getAllData', payload: jsonData.data })
          setLoading(false)
        } else {
          setError(jsonData.message)
          setLoading(false)
        }
      } catch (err) {
        setError(err.toString())
        setLoading(false)
      }
    })()
  }, [])

  const onClose = () => {
    setError(false)
  }

  return (
    <div className="App">
      {loading && <Loader />}
      {error && <ErrorBar errorMessage={error} onClose={onClose} />}
      <HeaderDesign />
      {todoState.map((category) => (
        <Category
          key={category.id}
          category={category}
          dispatch={dispatch}
          setLoading={setLoading}
          setError={setError}
        />
      ))}
    </div>
  )
}

export default App
