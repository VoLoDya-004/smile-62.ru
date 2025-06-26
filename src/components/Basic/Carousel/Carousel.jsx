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

	const [showChildren, setShowChildren] = useState(false)

	
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
		<span className="slider__advertisement" onMouseEnter={() => setShowChildren(true)} 
			onMouseLeave={() => setShowChildren(false)}>Реклама</span>
		</div>
		<div className={`slider__advertisement_description ${showChildren ? 'show' : ''}`}>
  			OOО "что-там"<br />
  			ИНН 777777777 <br />
 	 		здесь еще что-нибудь
		</div>
		</>
	)
}








// import { useEffect, useState, Children, cloneElement, useRef } from "react"
// import { useDrag } from "react-use-gesture"

// export default function Carousel({ children }) {
//     const [pages, setPages] = useState([])
//     const [offset, setOffset] = useState(0)
//     const [isDragging, setIsDragging] = useState(false) // Добавлено состояние для отслеживания перетаскивания
//     const sliderWindowRef = useRef(null) // Добавляем useRef

//     const handleLeftArrow = () => {
//         setOffset((currentOffset) => {
//             const width = sliderWindowRef.current.clientWidth // Используем useRef для получения ширины
//             const newOffset = currentOffset + width
//             const maxOffset = -(width * (pages.length - 1))
//             if (newOffset > 0) {
//                 return setOffset(maxOffset)
//             } else {
//                 return Math.min(newOffset, 0)
//             }
//         })
//     }

//     const handleRightArrow = () => {
//         setOffset((currentOffset) => {
//             const width = sliderWindowRef.current.clientWidth; // Используем useRef для получения ширины
//             const newOffset = currentOffset - width;
//             const maxOffset = -(width * (pages.length - 1));
//             if (newOffset < maxOffset) {
//                 return setOffset(0);
//             } else {
//                 return Math.max(newOffset, maxOffset);
//             }
//         });
//     };

//     useEffect(() => {
//         setPages(
//             Children.map(children, (child) => {
//                 return cloneElement(child, {
//                     style: {
//                         height: "100%",
//                         minWidth: "100%",
//                         maxWidth: "100%",
//                     },
//                 })
//             })
//         )
//     }, [children]) // Зависимость от children

//     const [showChildren, setShowChildren] = useState(false)

//     const bind = useDrag(({ delta: [dx], down }) => {
//         setIsDragging(down) // Устанавливаем состояние перетаскивания

//         if (!down) {
//             // После отпускания мыши/пальца применяем логику перелистывания
//             const width = sliderWindowRef.current.clientWidth // Используем useRef для получения ширины
//             const threshold = width / 4 // Определяем порог для перелистывания (например, 25% ширины)

//             if (dx > threshold) {
//                 handleLeftArrow() // Перелистываем влево
//             } else if (dx < -threshold) {
//                 handleRightArrow() // Перелистываем вправо
//             } else {
//                 // Если не достигли порога, возвращаем к ближайшему слайду
//                 const slideIndex = Math.round(offset / width)
//                 setOffset(slideIndex * width)

//             }
//         } else {
//             //Во время перетаскивания применяем смещение (для плавности перетаскивания)
//             const width = sliderWindowRef.current.clientWidth
//             const maxOffset = -(width * (pages.length - 1))
//             let newOffset = offset + dx
//             newOffset = Math.max(Math.min(newOffset, 0), maxOffset)  //ограничиваем смещение
//             setOffset(newOffset)

//         }
//     }, { axis: 'x' })

//     return (
//         <>
//             <div className="slider">
//                 <div className="slider__btn_left" onClick={handleLeftArrow}>
//                     <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "none", width: "24", height: "24", padding: "6px 0 0 6px" }}>
//                         <path
//                             style={{ fill: "#fff", fillRule: "evenodd", clipRule: "evenodd" }}
//                             d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"
//                         />
//                     </svg>
//                 </div>
//                 <div
//                     className="slider__window"
//                     ref={sliderWindowRef} // Привязываем useRef к элементу
//                     {...bind()} // Применяем обработчики жестов
//                     style={{ cursor: isDragging ? 'grabbing' : 'grab', overflow: 'hidden' }} // Меняем курсор во время перетаскивания
//                 >
//                     <div
//                         className="all-pages-container"
//                         style={{
//                             transform: `translateX(${offset}px)`,
//                             display: 'flex',
//                             transition: isDragging ? 'none' : 'transform 0.3s ease-out', // Добавляем плавную анимацию после перетаскивания
//                         }}
//                     >
//                         {pages}
//                     </div>
//                 </div>
//                 <div className="slider__btn_right" onClick={handleRightArrow}>
//                     <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "none", width: "24", height: "24", padding: "6px 0 0 6px" }}>
//                         <path
//                             style={{ fill: "#fff", fillRule: "evenodd", clipRule: "evenodd" }}
//                             d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"
//                         />
//                     </svg>
//                 </div>
//                 <span
//                     className="slider__advertisement"
//                     onMouseEnter={() => setShowChildren(true)}
//                     onMouseLeave={() => setShowChildren(false)}
//                 >
//                     Реклама
//                 </span>
//             </div>
//             <div className={`slider__advertisement_description ${showChildren ? "show" : ""}`}>
//                 OOО "что-там"
//                 <br />
//                 ИНН 777777777
//                 <br />
//                 здесь еще что-нибудь
//             </div>
//         </>
//     )
// }