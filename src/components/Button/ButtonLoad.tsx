import { memo } from 'react'


interface IButtonLoadProps {
  onClick: () => void
  children: React.ReactNode
  id?: string
  className: string
}


const ButtonLoad = ({onClick, children, id, className}: IButtonLoadProps) => {

    
  return (
    <button 
      type='button'
      id={id} 
      className={className} 
      onClick={onClick} 
    >
      {children}
    </button>
  )
}

export default memo(ButtonLoad)