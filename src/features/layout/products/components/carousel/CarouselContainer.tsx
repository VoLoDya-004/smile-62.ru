import type { TouchEvent, RefObject, ReactNode, PointerEvent } from 'react'
import ButtonArrow from '@/shared/ui/buttons/ButtonArrow'
import AdvertisementLabel from './advertisement/AdvertisementLabel'
import styles from './Carousel.module.scss'

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
  const {
    'slider': slider,
    'slider__window': sliderWindow,
    'slider__btn-left': sliderButtonLeft,
    'slider__btn-right': sliderButtonRight,
    'all-pages-container': pagesContainer
  } = styles

  return (
    <div className={slider} aria-label='Слайдер'>
      <ButtonArrow 
        onClick={onLeftArrowClick} 
        ariaLabel='Предыдущий слайд'
        className={sliderButtonLeft}
      />
      <div
        className={sliderWindow}
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
      >
        <div
          className={pagesContainer}
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
        className={sliderButtonRight}
      />             
      <AdvertisementLabel onHover={onAdvertisementHover} showChildren={showChildren} />
    </div>
  )
}

export default CarouselContainer

