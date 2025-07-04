import { useEffect, useRef, useState} from "react"
import axios from "axios"


export default function Recommendations() {
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const containerRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const scrollAmount = 500
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [isSmoothScroll, setIsSmoothScroll] = useState(true)
    const [showLeftButton, setSwowLeftButton] = useState(false)
    const [showRightButton, setSwowRightButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if(!containerRef.current) return

            const element = containerRef.current
            setSwowLeftButton(element.scrollLeft > 0)
            setSwowRightButton(element.scrollWidth - element.clientWidth > element.scrollLeft)
            setScrollPosition(element.scrollLeft)
        }

        const container = containerRef.current
            if (container) {
                container.addEventListener("scroll", handleScroll)
                handleScroll()

                return () => {
                    container.removeEventListener("scroll", handleScroll)
                }
            }
    }, [cards])

    useEffect(() => {
        loadCards()
    }, [])

  async function loadCards() {
    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/src/PHP/sort.php`, {
        params: {
          Operation: 'showCards',
          idUser: 222,
        },
      })
      setCards(response.data)
    } catch (error) {
      console.error("Ошибка при загрузке карточек:", error)
    } finally {
      setIsLoading(false)
    }
  }

    function scrollLeftBtn() {
        setIsSmoothScroll(true)
        if (containerRef.current) {
            containerRef.current.scrollLeft -= scrollAmount
            setScrollPosition(containerRef.current.scrollLeftBtn)
        }
    }

    function scrollRightBtn() {
        setIsSmoothScroll(true)
        if (containerRef.current) {
            containerRef.current.scrollLeft += scrollAmount
            setScrollPosition(containerRef.current.scrollLeftBtn)
        }
    }

    const handleMouseDown = (e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
        containerRef.current.style.cursor = 'grabbing'
        setIsSmoothScroll(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
        if (containerRef.current) {
            containerRef.current.style.cursor = 'grab'
        }
        setIsSmoothScroll(true)
    }  

    const handleMouseUp = () => {
        setIsDragging(false)
        if (containerRef.current) {
            containerRef.current.style.cursor = 'grab'
        }
        setIsSmoothScroll(true)
    }

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 1
        containerRef.current.scrollLeft = scrollLeft - walk
    }


    function RecommendationsProduct ({card}) {
        const sale = Math.round(100 * ((card.price - card.price_sale) / card.price))
        const price = Intl.NumberFormat('ru-RU').format(card.price * 1)
        const price_sale = Intl.NumberFormat('ru-RU').format(card.price_sale * 1)
            

        return (
            <div key={card.id} id={card.id} className="recommendationCard">
                <div className="recommendationCard__top">
                    <a className="recommendationCard__image">
                        <img src={card.image} alt="image" />
                    </a>
                    {sale !== 0 && <div className="recommendationCard__label">-{sale}%</div>}
                </div>
                <div className="recommendationCard__bottom">
                    {price === price_sale ? 
                    (
                        <>
                            <div 
                                className="recommendationCard__price recommendationCard__price_count-same">
                                {price}
                            </div>
                            <a className="recommendationCard__title">{card.nazvanie}</a>
                        </>
                    ) : 
                    (
                        <>
                        <div className="recommendationCard__prices">
                            <div className="recommendationCard__price recommendationCard__price_discount">
                                {price_sale}
                            </div>
                            <div className="recommendationCard__price recommendationCard__price_count">
                                {price}
                            </div>
                        </div>
                        <a className="recommendationCard__title">{card.nazvanie}</a> 
                        </>
                    )}
                </div>
            </div>
        )
    }


    return (
        <div className="recommendation">
            <b className="recommendation__title">Рекомендации</b><br />
            {isLoading ? 
                (
                    <>
                        <h3 style={{textAlign: 'center', padding: "20px"}}>Загрузка рекомендаций...</h3>
                        <div class="spinnerCards"></div>
                    </>
                ) :
                (
                    <>
                        { cards.length === 0 ? (
                            <div style={{textAlign: "center", padding: "20px"}}>
                                Пока что рекомендации пусты
                            </div>
                        ) : (
                        <div className="recommendation__box" >
                            {showLeftButton && (
                                <button className="recommendation__leftBtn" onClick={scrollLeftBtn} 
                                disabled={scrollPosition === 0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    style={{fill: "none", width: "24", height: "24"}}>
                                        <path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}}
                                            d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                </button>
                            )}
                            {showRightButton && (
                                <button className="recommendation__rightBtn" onClick={scrollRightBtn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    style={{fill: "none", width: "24", height: "24"}}>
                                        <path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}} 
                                        d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                </button>
                            )}
                            <div className="recommendation__container" 
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            style={{scrollBehavior: isSmoothScroll ? "smooth" : "auto"}}
                            >
                            {cards.map(card => ( 
                                <RecommendationsProduct 
                                    key={card.id}
                                    card={card}
                                />
                            ))}
                            </div>
                        </div>
                    )}
                    </>
                )
            }
        </div>
    )
}