interface IButtonProductDeleteProps {
  onClick: () => void
  ariaLabel: string
  dataAction?: string
}

const ButtonDelete = ({ onClick, ariaLabel, dataAction }: IButtonProductDeleteProps) => {
  return (
    <div className='button-product-controls'>
      <button
        type='button'
        className='button-product-controls'
        onClick={onClick}
        aria-label={ariaLabel}
        {...(dataAction && { 'data-action': dataAction })}
      >
        <svg
          className='button-product-controls-cross-hover'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path className='button-product-controls-cross' d='M18 6L6 18' />
          <path className='button-product-controls-cross' d='M6 6L18 18' />
        </svg>
      </button>
    </div>
  )
}

export default ButtonDelete