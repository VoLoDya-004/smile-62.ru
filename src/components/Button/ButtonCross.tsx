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
      <img 
        className='button-cross-svg'
        src='/images/icons/cross.png'
        alt='Закрыть'
      />
    </button>
  )
}

export default ButtonCross