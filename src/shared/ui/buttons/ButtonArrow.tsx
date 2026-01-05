import type { CSSProperties } from 'react'
import { memo } from 'react'

interface ButtonArrowProps {
  onClick: () => void
  ariaLabel: string
  className: string
  style?: CSSProperties
}

const ButtonArrow = ({ className, onClick, ariaLabel, style }: ButtonArrowProps) => {
    
  return (
    <button 
      type='button' 
      className={className} 
      onClick={onClick} 
      aria-label={ariaLabel}
      style={style}
    >
      <svg xmlns='http://www.w3.org/2000/svg' className='button-arrow-svg'>
        <path
          className='button-arrow-svg-path'
          d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
          1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
          1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
        />
      </svg>
    </button>
  )
}

export default memo(ButtonArrow)