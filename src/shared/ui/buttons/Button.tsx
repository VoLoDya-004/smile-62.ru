import type { CSSProperties, PointerEventHandler, ReactNode } from 'react'

interface IButtonProps {
  id?: string
  className?: string
  onClick?: PointerEventHandler<HTMLButtonElement>
  children: ReactNode
  style?: CSSProperties
}

const Button = ({ children, id, className, onClick, style }: IButtonProps) => {

  return (
	  <button 
      type='button'
      className={className} 
      id={id} 
      onClick={onClick}
      style={style}
    >   
      {children}
    </button>
  )
}

export default Button