import React from 'react'
import Task from './Task';

interface TasksProps {
  tasks : Array<{
    id: number,
    text: string,
    day: string,
    reminder: boolean
  }>;
  deleteTask: (id: number) => void; 
  toggleTask: (id: number) => void; 
}

const Tasks: React.FC<TasksProps> = ( { tasks, deleteTask, toggleTask } ) => {
  return (
    <>
    { tasks.map( ( task ) => (
      <Task task={ task } key={ task.id } deleteTask={ deleteTask } toggleTask={ toggleTask }/>
    ))}
    </>
  )
}

export default Tasks