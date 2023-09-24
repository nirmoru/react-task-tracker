import React from 'react'

interface ButtonProps {
  text: string,
  color: string
  showAddTask: ( ) => void,
}

const Button: React.FC<ButtonProps> = ( { text, color, showAddTask } ) => {
  return (
    <button className='btn' style={ { backgroundColor: color } } onClick={ ( ) => showAddTask( ) }>
      { text }
    </button>
  )
}

export default Button