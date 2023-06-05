export default function reducer(state, action) {
  const newState = [...state]
  const payload = action.payload
  let categoryIndex
  let category
  let categoryCopy
  let tasks
  let task
  let taskIndex
  let taskCopy
  let tasksCopy
  let subtasks
  let subTaskIndex
  let subtasksCopy
  let subtaskCopy

  switch (action.type) {
    case 'getAllData':
      return action.payload

    case 'createTask': // payload: {task}
      categoryIndex = newState.findIndex(
        (category) => category.id === payload.categoryid,
      )
      category = newState[categoryIndex]
      categoryCopy = { ...category, Tasks: [payload, ...category.Tasks] }
      // categoryCopy = { ...category, Tasks: [...category.Tasks, payload] }

      newState[categoryIndex] = categoryCopy
      return newState

    case 'completeTask': //  payload: {id,categoryid }
      categoryIndex = newState.findIndex(
        (category) => category.id === payload.categoryid,
      )
      category = newState[categoryIndex]
      tasksCopy = [...category.Tasks]
      taskIndex = tasksCopy.findIndex((task) => task.id === payload.id)
      taskCopy = { ...tasksCopy[taskIndex], isCompleted: true }
      tasksCopy[taskIndex] = taskCopy

      categoryCopy = { ...category, Tasks: tasksCopy }

      newState[categoryIndex] = categoryCopy
      return newState

    case 'createSubtask': // payload: {categoryid,subtask}
      categoryIndex = newState.findIndex(
        (category) => category.id === payload.categoryid,
      )
      category = newState[categoryIndex]
      tasks = category.Tasks
      taskIndex = category.Tasks.findIndex(
        (task) => task.id === payload.subtask.taskid,
      )
      task = tasks[taskIndex]
      subtasksCopy = [...task.Subtasks, payload.subtask]
      taskCopy = { ...task, Subtasks: subtasksCopy }
      tasksCopy = [...tasks]
      tasksCopy[taskIndex] = taskCopy
      categoryCopy = { ...category, Tasks: tasksCopy }
      newState[categoryIndex] = categoryCopy

      return newState

    case 'completeSubtask': // payload: {id, taskid, categoryid}
      categoryIndex = newState.findIndex(
        (category) => category.id === payload.categoryid,
      )
      category = newState[categoryIndex]
      tasks = category.Tasks
      taskIndex = category.Tasks.findIndex((task) => task.id === payload.taskid)
      task = tasks[taskIndex]
      subtasks = task.Subtasks
      subTaskIndex = subtasks.findIndex((subtask) => subtask.id === payload.id)
      subtaskCopy = { ...subtasks[subTaskIndex], isCompleted: true }
      subtasksCopy = [...subtasks]
      subtasksCopy[subTaskIndex] = subtaskCopy
      taskCopy = {
        ...task,
        Subtasks: subtasksCopy,
      }
      tasksCopy = [...tasks]
      tasksCopy[taskIndex] = taskCopy
      categoryCopy = { ...category, Tasks: tasksCopy }
      newState[categoryIndex] = categoryCopy

      return newState

    case 'completeTaskAndAllSubtasks': // payload: {taskid,categoryid}
      categoryIndex = newState.findIndex(
        (category) => category.id === payload.categoryid,
      )
      category = newState[categoryIndex]
      tasks = category.Tasks
      taskIndex = category.Tasks.findIndex((task) => task.id === payload.taskid)
      task = tasks[taskIndex]
      subtasksCopy = task.Subtasks.map((subtask) => ({
        ...subtask,
        isCompleted: true,
      }))
      taskCopy = {
        ...task,
        isCompleted: true,
        Subtasks: subtasksCopy,
      }
      tasksCopy = [...tasks]
      tasksCopy[taskIndex] = taskCopy
      categoryCopy = { ...category, Tasks: tasksCopy }
      newState[categoryIndex] = categoryCopy

      return newState

    default:
      return newState
  }
}
