import CrossSVG from '../Icons/CrossSVG'

interface IButtonCrossProps {
  id?: string
  className: string
  onClick?: () => void
}

const ButtonCross = ({ id, className, onClick }: IButtonCrossProps) => {

  return (
    <button 
      type='button'
      className={className} 
      id={id} 
      onClick={onClick}
      aria-label='Закрыть'
    >
      <CrossSVG />
    </button>
  )
}

export default ButtonCross