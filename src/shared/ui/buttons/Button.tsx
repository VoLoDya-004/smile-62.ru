import type { CSSProperties, PointerEventHandler, ReactNode } from 'react'

interface IButtonProps {
  id?: string
  className?: string
  onClick?: PointerEventHandler<HTMLButtonElement>
  children: ReactNode
  style?: CSSProperties
  disabled?: boolean
}

const Button = ({ children, id, className, onClick, style, disabled }: IButtonProps) => {

  return (
	  <button 
      type='button'
      className={className} 
      id={id} 
      onClick={onClick}
      style={style}
      disabled={disabled}
    >   
      {children}
    </button>
  )
}

export default Button