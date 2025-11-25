import type { PointerEventHandler, ReactNode } from 'react'


interface IButtonSubmitProps {
  id?: string
  className?: string
  onClick?: PointerEventHandler<HTMLButtonElement>
  children: ReactNode
}


const ButtonSubmit = ({ children, id, className, onClick }: IButtonSubmitProps) => {


  return (
	  <button 
      type='submit'
      className={className} 
      id={id} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonSubmit