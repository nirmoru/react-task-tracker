import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App: React.FC = () => {
  
  interface TaskProps {
    text: string,
    day: string,
    reminder: boolean
  }
  
  interface TasksProps {
    id: number,
    text: string,
    day: string,
    reminder: boolean
  }
  
  const [showAddTask, setShowAddTask] = React.useState(false)
  const [tasks, setTasks] = React.useState<TasksProps[]>([])

  React.useEffect( ( ) => {
    const getTasks = async ( ) => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
  getTasks();
  }, []) /* Removing the dependency array results in infinite GET request to the json-server.
          If anybody knows why it does this please create an Issue explaining the reason.*/

  const fetchTasks = async ( ) => {
    const res = await fetch('http://localhost:5000/tasks')
    const data: Array<TasksProps> = await res.json()
    return data
  }

  const fetchTask = async ( id: number ) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data: TasksProps = await res.json()
    return data
  }

  const deleteTask = async ( id: number ) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
          method: 'DELETE',
        }
      )

    res.status === 200 
      ? setTasks(tasks.filter( ( task: TasksProps ) => ( task.id !== id ) ))
      : alert("Error deleting task")
  }

  const toggleTask = async ( id: number ) => {
    const taskToToggle: TasksProps = await fetchTask( id )
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    await fetch( `http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    } )

    setTasks(tasks.map( ( task: TasksProps ) => ( task.id === id ? { ...task, reminder: updTask.reminder} : task )))
  }

  const addTask = async ( task : TaskProps ) => {
    // const id: number = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const toggleAddTask = () => {
    setShowAddTask( !showAddTask )
  }

  return (
    <Router>
      <div className='container'>
        <Header text={ showAddTask ? 'Close' : 'Add'} color={ showAddTask ? 'red' : 'green'} showAddTask={ toggleAddTask }/>

        <Routes>

          <Route 
            path='/'
            element={
              <>
              {showAddTask && <AddTask addTask={ addTask }/> }

              <Tasks tasks={ tasks } deleteTask={ deleteTask } toggleTask={ toggleTask }/>
              </>
            }/>

          <Route 
            path='/about'
            element={
              <About />
            }
          />

        </Routes>

        <Footer />

      </div>
    </Router>
  )
}

export default App