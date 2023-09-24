import React from 'react'
import Button from './Button'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  title?: string
  text: string,
  color: string,
  showAddTask: ( ) => void,
}

const Header: React.FC<HeaderProps> = ( { 
    title="React Task Tracker",
    text,
    color,
    showAddTask
  } ) => {

  const location = useLocation()
  return (
    <header className='header'>
      <h1> 
        { title } 
      </h1>
      { location.pathname === "/" &&
      <Button text={ text } color={ color } showAddTask={ showAddTask } />
      }
    </header>
  )
}

export default Header