import { useEffect, useState, Children, cloneElement, useRef, useCallback, isValidElement } from 'react'
import type { ReactNode, ReactElement, TouchEvent, CSSProperties, HTMLProps, PointerEvent } from 'react'
import CarouselContainer from './CarouselContainer'

interface StyledElementProps extends HTMLProps<HTMLElement> {
	style: CSSProperties
}

interface ICarouselProps {
  children: ReactNode
}

const Carousel = ({ children }: ICarouselProps) => {
	const [pages, setPages] = useState<ReactNode[]>([])
  const [containerWidth, setContainerWidth] = useState(0)
  const [showChildren, setShowChildren] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const startX = useRef(0)
  const isSwiping = useRef(false)

  useEffect(() => {
  	const updateWidth = () => {
  	  if (sliderRef.current) {
  	    setContainerWidth(sliderRef.current.clientWidth)
  	  }
  	}
  	updateWidth()
  	window.addEventListener('resize', updateWidth)
  	return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<StyledElementProps>, {
            style: {
              height: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              flexShrink: 0,
            }
          })
        }
        return child
      }) as ReactNode[]
    )
  }, [children])

  const handleLeftArrow = useCallback(() => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex - 1

      if (newIndex < 0) {
        setIsAnimating(false)
        return pages.length - 1
      }
      setIsAnimating(true)
      return newIndex
    })
  }, [pages])

  const handleRightArrow = useCallback(() => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + 1

      if (newIndex >= pages.length) {
        setIsAnimating(false)
        return 0
      }
      setIsAnimating(true)
      return newIndex
    })
  }, [pages])

  const handleTouchStart = (e: TouchEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => {
    isSwiping.current = true

    if ('touches' in e) {
      startX.current = e.touches[0].clientX
    } else {
      startX.current = e.clientX
    }
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => {
    if (!isSwiping.current) return

    isSwiping.current = false
    let endX: number

    if ('touches' in e) {
      endX = e.changedTouches[0].clientX
    } else {
      endX = e.clientX
    }

    const deltaX = endX - startX.current
    const swipeThreshold = containerWidth * 0.1

    if (deltaX > swipeThreshold) {
      handleLeftArrow()
    } else if (deltaX < -swipeThreshold) {
      handleRightArrow()
    }
  }

  const handlePointerUp = useCallback((e: Event) => {
    if (!isSwiping.current) return

    handleTouchEnd(e as unknown as PointerEvent<HTMLDivElement>)
    document.removeEventListener('pointerup', handlePointerUp)
  }, [handleTouchEnd])

  const offsetX = -currentIndex * containerWidth

	return (
	  <aside aria-label='Рекламный баннер'>
	    <CarouselContainer
	      onLeftArrowClick={handleLeftArrow}
	      onRightArrowClick={handleRightArrow}
	      sliderRef={sliderRef}
	      onTouchStart={handleTouchStart}
	      onTouchEnd={handleTouchEnd}
	      onPointerDown={(e) => {
	        handleTouchStart(e)
	        document.addEventListener('pointerup', handlePointerUp)
	      }}
	      offsetX={offsetX}
	      isAnimating={isAnimating}
	      pages={pages}
	      onAdvertisementHover={setShowChildren}
        showChildren={showChildren}
	    />
	  </aside>
	)
}

export default Carousel
















