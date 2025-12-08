import type { TouchEvent, RefObject, ReactNode, PointerEvent } from 'react'
import ButtonArrow from '@/components/Button/ButtonArrow'
import AdvertisementLabel from './Advertisement/AdvertisementLabel'

interface CarouselContainerProps {
  onLeftArrowClick: () => void
  onRightArrowClick: () => void
  sliderRef: RefObject<HTMLDivElement | null> 
  onTouchStart: (e: TouchEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => void
  onTouchEnd: (e: TouchEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => void
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void
  offsetX: number
  isAnimating: boolean
  pages: ReactNode[]
  onAdvertisementHover: (show: boolean) => void
  showChildren: boolean
}

const CarouselContainer = ({
  onLeftArrowClick,
  onRightArrowClick,
  sliderRef,
  onTouchStart,
  onTouchEnd,
  onPointerDown,
  offsetX,
  isAnimating,
  pages,
  onAdvertisementHover,
  showChildren
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
        onPointerDown={onPointerDown}
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
      <AdvertisementLabel onHover={onAdvertisementHover} showChildren={showChildren} />
    </div>
  )
}

export default CarouselContainer

