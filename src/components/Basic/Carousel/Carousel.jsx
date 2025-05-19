import TabSectionMobile from "../../Header/HeaderComponents/TabSectionMobile"
import { useEffect, useState, Children, cloneElement } from "react"

export default function Carousel({children}) {
	const [pages, setPages] = useState([])
	const [offset,setOffset] = useState(0)

	const handleLeftArrow = () => {
		setOffset((currentOffset) => {
			const width = document.querySelector(".slider__window").clientWidth
			const newOffset = currentOffset + width
			const maxOffset = -(width * (pages.length - 1))
			if (newOffset > 0) {
				return setOffset(maxOffset)
			} else {
				return Math.min(newOffset, 0)
			}
		})
	}
	const handleRightArrow = () => {
		setOffset((currentOffset) => {
			const width = document.querySelector(".slider__window").clientWidth
			const newOffset = currentOffset - width
			const maxOffset = -(width * (pages.length - 1))
			if (newOffset < maxOffset) {
				return setOffset(0)
			} else {
				return Math.max(newOffset, maxOffset)
			}
		})
	}

	useEffect(() => {
		setPages(Children.map(children, child => {
			return cloneElement(child, {
				style: {
					height: '100%',
					minWidth: '100%',
					maxWidth: '100%',
				}
				
			})
		}))
	}, [])

	return (
	<>
		<div className="slider">
			<div className="slider__btn_left" onClick={handleLeftArrow}>
				<svg xmlns="http://www.w3.org/2000/svg" style={{fill: "none", width: "24", height: "24", padding: "6px 0 0 6px"}}>
            	<path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}} d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
            	</svg>
			</div>
			<div className="slider__window">
				<div className="all-pages-container"
					style={{
						transform: `translateX(${offset}px)`,
					}}>
					{pages}
				</div>
			</div>
			<div className="slider__btn_right" onClick={handleRightArrow}>
				<svg xmlns="http://www.w3.org/2000/svg" style={{fill: "none", width: "24", height: "24", padding: "6px 0 0 6px"}}>
            	<path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}} d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
            	</svg>
			</div>
		</div>
		<TabSectionMobile />
	</>
	)
}