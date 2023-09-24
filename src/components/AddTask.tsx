import React from 'react'

interface addTaskProps {
  addTask: ( 
    newTask: {
      text: string,
      day: string,
      reminder: boolean
  } ) => void;
}

const AddTask: React.FC<addTaskProps> = ( { addTask } ) => {
  const [text, setText] = React.useState('')
  const [day, setDay] = React.useState('')
  const [reminder, setReminder] = React.useState(false)

  const submitTask = ( e: React.FormEvent ) => {
    e.preventDefault()

    if (!text){
      alert('No task Given!')
    }

    const newTask = { text, day, reminder }

    addTask( newTask )

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className='add-task' onSubmit={ submitTask }>
      <div className='form-control'>
        <label> Add Task </label>
        <input 
        type='text'
        value={ text }
        placeholder=' Add Task '
        onChange={ ( e ) => setText( e.target.value )}
        ></input>
      </div>
      <div className='form-control'>
        <label> Add Date </label>
        <input 
        type='text'
        value={ day }
        placeholder=' Add Date '
        onChange={ ( e ) => setDay( e.target.value )}
        ></input>
      </div>
      <div className='form-control form-control-check'>
        <label> Reminder </label>
        <input 
        type='checkbox'
        checked={ reminder }
        placeholder=' Add Task '
        onChange={ ( e ) => setReminder( e.currentTarget.checked )}
        ></input>
      </div>
      <input type='submit' className='btn btn-block' value='Add Task' />
    </form>
  )
}

export default AddTask