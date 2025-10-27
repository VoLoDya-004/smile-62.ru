import React, { useEffect, useState, Children, cloneElement, useRef, 
type ReactNode, type ReactElement, type TouchEvent, useCallback} from 'react'


interface StyledElementProps extends React.HTMLProps<HTMLElement> {
	style: React.CSSProperties
}

interface ICarouseelProps {
	children: ReactNode
}


const Carousel = ({children}: ICarouseelProps) => {
  	const [pages, setPages] = useState<ReactNode[]>([])
  	const sliderRef = useRef<HTMLDivElement | null>(null)
  	const [containerWidth, setContainerWidth] = useState(0)
  	const startX = useRef(0)
  	const isSwiping = useRef(false)
  	const [showChildren, setShowChildren] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(true);

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
	    	const newIndex = prevIndex + 1;
	    	if (newIndex >= pages.length) {
	      		setIsAnimating(false)
	      		return 0
	    	}
	    	setIsAnimating(true)
	    	return newIndex
	  	})
	}

	const offsetX = -currentIndex * containerWidth;
		
	const handleTouchStart = (e: TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		isSwiping.current = true
		if ('touches' in e) {
			startX.current = e.touches[0].clientX
		} else {
			startX.current = e.clientX
		}
	}

	const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
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

	const handlePointerUp = useCallback((e: PointerEvent)=> {
	  	if (!isSwiping.current) return
	  	handleTouchEnd(e)
	  	document.removeEventListener('pointermove', handlePointerMove)
	  	document.removeEventListener('pointerup', handlePointerUp)
	}, [handlePointerMove, handleTouchEnd])


	return (
		<aside aria-label='Рекламный баннер'>
			<div 
				className='slider' 
				aria-label='Слайдер' 
				tabIndex={0}
			>
	    	  		<button 
						className='slider__btn-left' 
						onClick={handleLeftArrow}
						aria-label='Предыдущий слайд'
					> 
	    	    		<svg
	    	      			xmlns='http://www.w3.org/2000/svg'
	    	      			className='slider__btn-svg'
	    	    		>
	    	      			<path
	    	        			className='slider__btn-svg-path'
	    	        			d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
								1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
								1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
	    	      			/>
	    	    		</svg>
	    	  		</button>	
	    	  	<div
	    	    	className='slider__window'
	    	    	ref={sliderRef}
	    	    	onTouchStart={handleTouchStart}
	    	    	onTouchEnd={handleTouchEnd}
					onMouseDown={(e) => {
						handleTouchStart(e)
	    				document.addEventListener('pointermove', handlePointerMove)
	    				document.addEventListener('pointerup', handlePointerUp)
					}}
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
	    	  	<button 
					className='slider__btn-right' 
					onClick={handleRightArrow}
					aria-label='Следующий слайд'
				>
	    	    	<svg
	    	    		xmlns='http://www.w3.org/2000/svg'
	    	    		className='slider__btn-svg'
	    	    	>
	    	    		<path
	    	      			className='slider__btn-svg-path'
	    	    			d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
							1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
							1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
	    	    		/>
	    	    	</svg>
	    	    </button>
	    		<span
	    			className='slider__advertisement'
					role='complementary'
					aria-label='Реклама'
	    			onMouseEnter={() => setShowChildren(true)}
	    			onMouseLeave={() => setShowChildren(false)}
	    		>
	    			Реклама
	    		</span>	
	    	</div>	
	    	<div 
				className={`slider__advertisement-description ${showChildren ? 'show' : ''}`}
				role='contentinfo'
			>
	    		ООО "что-там"<br />
	    		ИНН 777777777<br />
	    		здесь еще что-нибудь
	    	</div>
	  	</aside>
	)
}

export default Carousel