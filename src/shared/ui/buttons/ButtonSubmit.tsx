import type { PointerEventHandler, ReactNode } from 'react'

interface IButtonSubmitProps {
  id?: string
  className?: string
  onClick?: PointerEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled: boolean
}

const ButtonSubmit = ({ children, id, className, onClick, disabled }: IButtonSubmitProps) => {

  return (
	  <button 
      type='submit'
      className={className} 
      id={id} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ButtonSubmit
