import type { TouchEvent, MouseEvent, RefObject, ReactNode } from 'react'
import ButtonArrow from '../../../Button/ButtonArrow'
import AdvertisementLabel from './Advertisement/AdvertisementLabel'


interface CarouselContainerProps {
  onLeftArrowClick: () => void
  onRightArrowClick: () => void
  sliderRef: RefObject<HTMLDivElement | null> 
  onTouchStart: (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void
  onTouchEnd: (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void
  offsetX: number
  isAnimating: boolean
  pages: ReactNode[]
  onAdvertisementHover: (show: boolean) => void
}


const CarouselContainer = ({
  onLeftArrowClick,
  onRightArrowClick,
  sliderRef,
  onTouchStart,
  onTouchEnd,
  onMouseDown,
  offsetX,
  isAnimating,
  pages,
  onAdvertisementHover,
}: CarouselContainerProps) => {


  return (
    <div className='slider' aria-label='Слайдер'>
      <ButtonArrow 
        onClick={onLeftArrowClick} 
        ariaLabel='Предыдущий слайд'
        className='slider__btn-left'
      />
      <div
        className='slider__window'
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <div
          className='all-pages-container'
          style={{
            transition: isAnimating ? 'transform 0.3s ease' : 'none',
            transform: `translateX(${offsetX}px)`,
          }}
        >
          {pages}
        </div>
      </div>      
      <ButtonArrow 
        onClick={onRightArrowClick} 
        ariaLabel='Следующий слайд'
        className='slider__btn-right'
      />             
      <AdvertisementLabel onHover={onAdvertisementHover} />
    </div>
  )
}

export default CarouselContainer