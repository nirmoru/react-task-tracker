import { FaTimes } from 'react-icons/fa'
import React from 'react'

interface TaskProps {
  task: {
    id: number,
    text: string,
    day: string,
    reminder: boolean
  };
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ( { task, deleteTask, toggleTask } ) => {
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`} onDoubleClick={ ( ) => { toggleTask( task.id ) } }>
      <h3>
        { task.text }
        <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick={ ( ) => { deleteTask( task.id ) }}/>
      </h3>
      <p>
        { task.day }
      </p>
    </div>
  )
}

export default Task