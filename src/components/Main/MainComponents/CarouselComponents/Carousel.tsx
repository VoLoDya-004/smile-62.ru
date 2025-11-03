import React, { useEffect, useState, Children, cloneElement, useRef, useCallback } from 'react'
import type { ReactNode, ReactElement, TouchEvent, MouseEvent, CSSProperties } from 'react'
import CarouselContainer from './CarouselContainer'
import AdvertisementInfo from './Advertisement/AdvertisementInfo'


interface StyledElementProps extends React.HTMLProps<HTMLElement> {
	style: CSSProperties
}

interface ICarouselProps {
  	children: ReactNode
}


const Carousel = ({ children }: ICarouselProps) => {
	const [pages, setPages] = useState<ReactNode[]>([])
  	const sliderRef = useRef<HTMLDivElement | null>(null)
  	const [containerWidth, setContainerWidth] = useState(0)
  	const startX = useRef(0)
  	const isSwiping = useRef(false)
  	const [showChildren, setShowChildren] = useState(false)
  	const [currentIndex, setCurrentIndex] = useState(0)
  	const [isAnimating, setIsAnimating] = useState(true)

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
  	  	  	  	if (React.isValidElement(child)) {
  	  	  	  	  	return cloneElement(child as ReactElement<StyledElementProps>, {
  	  	  	  	  	  	style: {
  	  	  	  	  	  	  	height: '100%',
  	  	  	  	  	  	  	minWidth: '100%',
  	  	  	  	  	  	  	maxWidth: '100%',
  	  	  	  	  	  	  	flexShrink: 0,
  	  	  	  	  	  	},
  	  	  	  	  	})
  	  	  	  	}
  	  	  	  	return child
  	  	  	}) as ReactNode[]
  	  	)
  	}, [children])

  	const handleLeftArrow = () => {
  	  	setCurrentIndex((prevIndex) => {
  	  	  	const newIndex = prevIndex - 1
  	  	  	if (newIndex < 0) {
  	  	  	  	setIsAnimating(false)
  	  	  	  	return pages.length - 1
  	  	  	}
  	  	  	setIsAnimating(true)
  	  	  	return newIndex
  	  	})
  	}

  	const handleRightArrow = () => {
  	  	setCurrentIndex((prevIndex) => {
  	  	  	const newIndex = prevIndex + 1
  	  	  	if (newIndex >= pages.length) {
  	  	  	  	setIsAnimating(false)
  	  	  	  	return 0
  	  	  	}
  	  	  	setIsAnimating(true)
  	  	  	return newIndex
  	  	})
  	}

  	const handleTouchStart = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
  	  	isSwiping.current = true
  	  	if ('touches' in e) {
  	  	  	startX.current = e.touches[0].clientX
  	  	} else {
  	  	  	startX.current = e.clientX
  	  	}
  	}

  	const handleTouchEnd = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
  	  	if (!isSwiping.current) return
  	  	isSwiping.current = false
  	  	let endX: number
  	  	if ('touches' in e) {
  	  	  	endX = e.changedTouches[0].clientX
  	  	} else {
  	  	  	endX = e.clientX
  	  	}
  	  	const deltaX = endX - startX.current
  	  	const swipeThreshold = 50
  	  	if (deltaX > swipeThreshold) {
  	  	  	handleLeftArrow()
  	  	} else if (deltaX < -swipeThreshold) {
  	  	  	handleRightArrow()
  	  	}
  	}

  	const handlePointerMove = useCallback(() => {
  	  	if (!isSwiping.current) return
  	}, [])

  	const handlePointerUp = useCallback(
  	  	(e: PointerEvent) => {
  	  	  	if (!isSwiping.current) return
  	  	  	handleTouchEnd(e as unknown as MouseEvent<HTMLDivElement>)
  	  	  	document.removeEventListener('pointermove', handlePointerMove)
  	  	  	document.removeEventListener('pointerup', handlePointerUp)
  	  	},
  	  	[handlePointerMove, handleTouchEnd]
  	)

  	const offsetX = -currentIndex * containerWidth


	return (
	  	<aside aria-label='Рекламный баннер'>
	  	  	<CarouselContainer
	  	  	  	onLeftArrowClick={handleLeftArrow}
	  	  	  	onRightArrowClick={handleRightArrow}
	  	  	  	sliderRef={sliderRef}
	  	  	  	onTouchStart={handleTouchStart}
	  	  	  	onTouchEnd={handleTouchEnd}
	  	  	  	onMouseDown={(e) => {
	  	  	  	  	handleTouchStart(e)
	  	  	  	  	document.addEventListener('pointermove', handlePointerMove)
	  	  	  	  	document.addEventListener('pointerup', handlePointerUp)
	  	  	  	}}
	  	  	  	offsetX={offsetX}
	  	  	  	isAnimating={isAnimating}
	  	  	  	pages={pages}
	  	  	  	onAdvertisementHover={setShowChildren}
	  	  	/>
	  	  	<AdvertisementInfo show={showChildren} />
	  	</aside>
	)
}

export default Carousel






