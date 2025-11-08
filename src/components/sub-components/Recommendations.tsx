import { useEffect, useRef, useState, memo, type MouseEvent } from 'react'
import type { RootStore } from '../../redux'
import { useSelector } from 'react-redux'
import type { ICardsRender } from '../../types/types'
import axios from 'axios'
import ButtonArrow from '../Button/ButtonArrow'

interface IRecommendationsProductProps {
    card: ICardsRender
}

const RecommendationsProduct = memo(({ card }: IRecommendationsProductProps) => {
    const sale = Math.round(100 * ((card.price - card.price_sale) / card.price))
    const price = Intl.NumberFormat('ru-RU').format(card.price * 1)
    const price_sale = Intl.NumberFormat('ru-RU').format(card.price_sale * 1)
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <article 
            key={card.id} 
            id={String(card.id)} 
            className={`recommendation-card ${isDarkTheme ? 'dark-theme' : ''}`}
        >
            <div className='recommendation-card__top'>
                <div className='recommendation-card__image'>
                    <img src={card.image} alt='Товар' loading='lazy' />
                </div>
                {sale !== 0 && <div className='recommendation-card__label'>-{sale}%</div>}
                {sale >= 20 && <div className='recommendation-card__sale'>выгодно</div>}
            </div>
            <div className='recommendation-card__bottom'>
                {price === price_sale ? (
                    <>
                        <div 
                            className='
                                recommendation-card__price recommendation-card__price-count-same
                            '
                        >
                            <span className='text-nowrap'>{price} &#x20BD;</span> 
                            <div className='recommendation-card__price-count-same-title'>
                                Обычная
                            </div>
                        </div>
                        <div 
                            className={`
                                recommendation-card__title ${isDarkTheme ? 'dark-theme' : ''}
                            `}
                        >
                            {card.nazvanie}
                        </div>
                    </>
                ) : (
                    <>
                        <div className='recommendation-card__prices'>
                            <div 
                                className='
                                    recommendation-card__price recommendation-card__price-discount
                                '
                            >
                                <span className='text-nowrap'>{price_sale} &#x20BD;</span>
                                <div className='recommendation-card__price-discount-title'>
                                    Со скидкой
                                </div>
                            </div>
                            <div 
                                className='
                                    recommendation-card__price recommendation-card__price-count
                                '
                            >
                                <span className='text-nowrap'>{price} &#x20BD;</span> 
                                <div className='recommendation-card__price-count-title'>
                                    Обычная
                                </div>
                            </div>
                        </div>
                        <div 
                            className={`
                                recommendation-card__title ${isDarkTheme ? 'dark-theme' : ''}
                            `}
                        >
                            {card.nazvanie}
                        </div>
                    </>
                )}
            </div>
        </article>
    )
})

const RecommendationsLoading = () => (
    <>
        <h2 className='recommendation-loading'>Загрузка рекомендаций...</h2>
        <div className='spinner-cards'></div>
    </>
)


const RecommendationsEmpty = () => (
    <h2 className='recommendation-loading'>Пока что рекомендации пусты</h2>
)


const RecommendationsContainer = ({ 
    cards, 
    isDarkTheme,
    containerRef,
    scrollHandlers,
    showLeftButton,
    showRightButton,
    scrollLeftBtn,
    scrollRightBtn
}: {
    cards: ICardsRender[]
    isDarkTheme: boolean
    containerRef: React.RefObject<HTMLDivElement | null>
    scrollHandlers: any
    showLeftButton: boolean
    showRightButton: boolean
    scrollLeftBtn: () => void
    scrollRightBtn: () => void
}) => (
    <div className={`recommendation__box ${isDarkTheme ? 'dark-theme' : ''}`}>
        {showLeftButton && (
            <ButtonArrow 
                onClick={scrollLeftBtn}
                ariaLabel='Листать рекомендуемые товары назад'
                className='recommendation__left-btn'
            />
        )}
        {showRightButton && (
            <ButtonArrow 
                onClick={scrollRightBtn}
                ariaLabel='Листать рекомендуемые товары вперёд'
                className='recommendation__right-btn'
            />
        )}
        <div
            className='recommendation__container'
            ref={containerRef}
            {...scrollHandlers}
            tabIndex={-1} 
        >
            {cards.map((card) => (
                <RecommendationsProduct key={card.id} card={card} />
            ))}
        </div>
    </div>
)


const Recommendations = () => {
    const [cards, setCards] = useState<ICardsRender[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
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
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            handleScroll()    
            return () => container.removeEventListener('scroll', handleScroll)
        }
    }, [cards])

    useEffect(() => {
        loadCards()      
    }, [])

    async function loadCards() {
        setIsLoading(true)
        try {
            const response = await axios.get(`/backend/PHP/sort.php`, {
                params: {
                    Operation: 'showCards',
                    idUser: userId ?? 0,
                },
            })
            setCards(response.data)
        } finally {
            setIsLoading(false)
        }
    }

    const scrollLeftBtn = () => {
        if (containerRef.current) {
            setIsSmoothScroll(true)
            containerRef.current.scrollLeft -= scrollAmount
        }
    }

    const scrollRightBtn = () => {
        if (containerRef.current) {
            setIsSmoothScroll(true)
            containerRef.current.scrollLeft += scrollAmount
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

    const scrollHandlers = {
        onMouseDown: handleMouseDown,
        onMouseLeave: handleMouseLeave,
        onMouseUp: handleMouseUp,
        onMouseMove: handleMouseMove,
        style: { scrollBehavior: isSmoothScroll ? 'smooth' : 'auto' } as const
    }


    return (
        <section className='recommendation'>
            <h2 className='recommendation__title'>Рекомендации</h2>
            {isLoading ? (
                <RecommendationsLoading />
            ) : cards.length === 0 ? (
                <RecommendationsEmpty />
            ) : (
                <RecommendationsContainer
                    cards={cards}
                    isDarkTheme={isDarkTheme}
                    containerRef={containerRef}
                    scrollHandlers={scrollHandlers}
                    showLeftButton={showLeftButton}
                    showRightButton={showRightButton}
                    scrollLeftBtn={scrollLeftBtn}
                    scrollRightBtn={scrollRightBtn}
                />
            )}
        </section> 
    )
}   

export default Recommendations
















