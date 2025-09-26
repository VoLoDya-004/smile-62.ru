import { useEffect, useRef, useState, memo, type MouseEvent } from 'react'
import type { RootStore } from '../../redux'
import { useSelector } from 'react-redux'
import type { ICardsRender } from '../../types/types'
import axios from 'axios'


interface IRecommendationsProductProps {
    card: ICardsRender
}


const RecommendationsProduct = memo(({ card }: IRecommendationsProductProps) => {
    const sale = Math.round(100 * ((card.price - card.price_sale) / card.price))
    const price = Intl.NumberFormat('ru-RU').format(card.price * 1)
    const price_sale = Intl.NumberFormat('ru-RU').format(card.price_sale * 1)

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <div 
            key={card.id} 
            id={String(card.id)} 
            className={`recommendation-card ${isDarkTheme ? 'dark-theme' : ''}`}
        >
            <div className='recommendation-card__top'>
                <a className='recommendation-card__image'>
                    <img 
                        src={card.image} 
                        alt='img' 
                        loading='lazy' 
                    />
                </a>
                {sale !== 0 && 
                    <div className='recommendation-card__label'>-{sale}%</div>
                }
            </div>
            <div className='recommendation-card__bottom'>
                {price === price_sale ? (
                    <>
                        <div 
                            className='
                                recommendation-card__price 
                                recommendation-card__price-count-same
                            '
                        >
                            {price}
                        </div>
                        <a 
                            className={`
                                recommendation-card__title 
                                ${isDarkTheme ? 'dark-theme' : ''}
                            `}
                        >
                            {card.nazvanie}
                        </a>
                    </>
                ) : (
                        <>
                            <div className='recommendation-card__prices'>
                                <div 
                                    className='
                                        recommendation-card__price 
                                        recommendation-card__price-discount
                                    '
                                >
                                    {price_sale}
                                </div>
                                <div 
                                    className='
                                        recommendation-card__price 
                                        recommendation-card__price-count
                                    '
                                >
                                    {price}
                                </div>
                            </div>
                            <a 
                                className={`recommendation-card__title 
                                    ${isDarkTheme ? 'dark-theme' : ''}`
                                }
                            >
                                {card.nazvanie}
                            </a>
                        </>
                    )}
            </div>
        </div>
    )
})


const Recommendations = () => {
    const [cards, setCards] = useState<ICardsRender[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [scrollPosition, setScrollPosition] = useState<number>(0)
    const scrollAmount = 500
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [isSmoothScroll, setIsSmoothScroll] = useState<boolean>(true)
    const [showLeftButton, setShowLeftButton] = useState<boolean>(false)
    const [showRightButton, setShowRightButton] = useState<boolean>(false)

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
    const userId = useSelector((state: RootStore) => state.user.userId)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            const element = containerRef.current
            setShowLeftButton(element.scrollLeft > 0)
            setShowRightButton(
                element.scrollWidth - element.clientWidth > element.scrollLeft + 1
            )
            setScrollPosition(element.scrollLeft)
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            handleScroll()    
            return () => {
                container.removeEventListener('scroll', handleScroll)
            }
        }
    }, [cards])

    useEffect(() => {
        loadCards()      
    }, [])

    async function loadCards() {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:3000/backend/PHP/sort.php`, {
                params: {
                    Operation: 'showCards',
                    idUser: userId ?? 0,
                },
            })
            setCards(response.data)
        } catch (error) {
            console.error('Ошибка при загрузке карточек:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const scrollLeftBtn = () => {
        if (containerRef.current) {
            setIsSmoothScroll(true)
            containerRef.current.scrollLeft -= scrollAmount
            setScrollPosition(containerRef.current.scrollLeft)
        }
    }

    const scrollRightBtn = () => {
        if (containerRef.current) {
            setIsSmoothScroll(true)
            containerRef.current.scrollLeft += scrollAmount
            setScrollPosition(containerRef.current.scrollLeft)
        }
    }

    const handleMouseDown = (e: MouseEvent) => {
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

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 1
        containerRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div className='recommendation'>
            <b className='recommendation__title'>Рекомендации</b><br />
            {isLoading ? (
            <>
                <h3 className='recommendation-loading'>Загрузка рекомендаций...</h3>
                <div className='spinner-cards'></div>
            </>
            ) : (
            <>
                {cards.length === 0 ? (
                <div className='recommendation-loading'>
                    Пока что рекомендации пусты
                </div>
                ) : (
                <div className={`recommendation__box ${isDarkTheme ? 'dark-theme' : ''}`}>
                    {showLeftButton && (
                    <button 
                        className='recommendation__left-btn' 
                        onClick={scrollLeftBtn} 
                        disabled={scrollPosition === 0}
                    >
                        <svg 
                            xmlns='http://www.w3.org/2000/svg'
                            className='svg-btn-fill-none'
                        >
                            <path 
                                className='white-fill-clip'
                                d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
                                1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
                                1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
                            />
                        </svg>
                    </button>
                    )}
                    {showRightButton && (
                    <button 
                        className='recommendation__right-btn' 
                        onClick={scrollRightBtn}
                    >
                        <svg 
                            xmlns='http://www.w3.org/2000/svg' 
                            className='svg-btn-fill-none'
                        >
                            <path 
                                className='white-fill-clip' 
                                d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
                                1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
                                1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
                            />
                        </svg>
                    </button>
                    )}
                    <div
                    className='recommendation__container'
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{ scrollBehavior: isSmoothScroll ? 'smooth' : 'auto' }}
                    >
                    {cards.map((card) => (
                        <RecommendationsProduct key={card.id} card={card} />
                    ))}
                    </div>
                </div>
                )}
            </>
            )}
        </div>
    )
}   

export default Recommendations
















