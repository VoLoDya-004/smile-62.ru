import { useEffect, useState, Children, cloneElement, useRef } from "react"


export default function Carousel({ children }) {
  	const [pages, setPages] = useState([])
  	const sliderRef = useRef(null)
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
	    	Children.map(children, (child) =>
	      		cloneElement(child, {
	        		style: {
	          		height: '100%',
	          		minWidth: '100%',
	          		maxWidth: '100%',
	          		flexShrink: 0,
	        },
	    		})
	    	)
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

	const handleTouchStart = (e) => {
	  	isSwiping.current = true
	  	startX.current = e.touches ? e.touches[0].clientX : e.clientX
	}		

	const handleTouchEnd = (e) => {
	  	if (!isSwiping.current) return
	  	isSwiping.current = false
	  	const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
	  	const deltaX = endX - startX.current	
	  	const swipeThreshold = 50	
	  	if (deltaX > swipeThreshold) {
	    	handleLeftArrow()
	  	} else if (deltaX < -swipeThreshold) {
	    	handleRightArrow()
	  	}
	}	

	function handleMouseMove() {
		if (!isSwiping.current) return
	}	

	function handleMouseUp(e) {
	  	if (!isSwiping.current) return
	  	handleTouchEnd(e)
	  	document.removeEventListener("mousemove", handleMouseMove)
	  	document.removeEventListener("mouseup", handleMouseUp)
	}


	return (
		<aside>
			<div className="slider">
	    	  		<div className="slider__btn_left" onClick={handleLeftArrow}>
	    	    		<svg
	    	      			xmlns="http://www.w3.org/2000/svg"
	    	      			style={{
	    	        			fill: "none",
	    	        			width: "24px",
	    	        			height: "24px",
	    	        			padding: "6px 0 0 6px",
	    	      			}}
	    	    		>
	    	      			<path
	    	        			style={{
	    	          				fill: "#fff",
	    	          				fillRule: "evenodd",
	    	          				clipRule: "evenodd",
	    	        			}}
	    	        		d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"
	    	      			/>
	    	    		</svg>
	    	  		</div>	
	    	  	<div
	    	    	className="slider__window"
	    	    	ref={sliderRef}
	    	    	style={{
	    	    		overflow: "hidden",
	    	    		width: "100%",
	    	    		position: "relative",
	    	    		cursor: "grab",
	    	    	}}
	    	    	onTouchStart={handleTouchStart}
	    	    	onTouchEnd={handleTouchEnd}
	    	    	onMouseDown={(e) => {
	    	    		handleTouchStart(e)
	    	    		document.addEventListener("mousemove", handleMouseMove)
	    	    		document.addEventListener("mouseup", handleMouseUp)
	    	    	}}
	    	  	>
	    	    	<div
	    	    		className="all-pages-container"
	    	    		style={{
	    	    			display: "flex",
	    	    			transition: isAnimating ? "transform 0.3s ease" : "none",
	    	    			transform: `translateX(${offsetX}px)`,
	    	    		}}
	    	    	>
	    	    	  {pages}
	    	    	</div>
	    	  	</div>
	    	  	<div className="slider__btn_right" onClick={handleRightArrow}>
	    	    	<svg
	    	    		xmlns="http://www.w3.org/2000/svg"
	    	    		style={{
	    	    			fill: "none",
	    	    			width: "24px",
	    	    			height: "24px",
	    	    			padding: "6px 0 0 6px",
	    	    		}}
	    	    >
	    	    		<path
	    	      			style={{
	    	    				fill: "#fff",
	    	    				fillRule: "evenodd",
	    	    				clipRule: "evenodd",
	    	    			}}
	    	    			d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"
	    	    		/>
	    	    	</svg>
	    	    </div>
	    		<span
	    			className="slider__advertisement"
	    			onMouseEnter={() => setShowChildren(true)}
	    			onMouseLeave={() => setShowChildren(false)}
	    		>
	    			Реклама
	    		</span>	
	    	</div>	
	    	<div className={`slider__advertisement_description ${showChildren ? "show" : ""}`}>
	    		ООО "что-там"<br />
	    		ИНН 777777777<br />
	    		здесь еще что-нибудь
	    	</div>
	  	</aside>
	)
}