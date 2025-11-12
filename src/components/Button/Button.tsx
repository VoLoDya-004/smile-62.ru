import type { MouseEventHandler, ReactNode } from 'react'
import type React from 'react'


interface IButtonProps {
  id?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  style?: React.CSSProperties 
}


const Button = ({children, id, className, onClick, style}: IButtonProps) => {


  return (
	  <button 
      type='button'
      className={className} 
      id={id} 
      onClick={onClick}
      style={style}
    >   
      <b>{children}</b>
    </button>
  )
}

export default Button