import { useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react'
import { useRecommendations } from '@/shared/hooks'
import type { ICardsRender } from '@/features/layout/products/types/mainTypes'
import type { IScrollHandlers } from './types/recommendationsTypes'
import { cx } from '@/shared/utils/classnames'
import ButtonArrow from '@/shared/ui/buttons/ButtonArrow'
import styles from './Recommendations.module.scss'

const RecommendationsProduct = ({ card }: { card: ICardsRender }) => {
  const {
    'recommendation-card': product,
    'recommendation-card__top': productTop,
    'recommendation-card__bottom': productBottom,
    'recommendation-card__image': productImage,
    'recommendation-card__label': productLabel,
    'recommendation-card__sale': productSale,
    'recommendation-card__price': productPrice,
    'recommendation-card__price-count-same': productPriceCountSame,
    'recommendation-card__price-count-same-title': productPriceCountSameTitle,
    'recommendation-card__title': productTitle,
    'recommendation-card__prices': productPrices,
    'recommendation-card__price-discount': productPriceDiscount,
    'recommendation-card__price-discount-title': productPriceDiscountTitle,
    'recommendation-card__price-count': productPriceCount,
    'recommendation-card__price-count-title': productPriceCountTitle
  } = styles

  const sale = Math.round(100 * ((card.price - card.price_sale) / card.price))
  const price = Intl.NumberFormat('ru-RU').format(card.price * 1)
  const price_sale = Intl.NumberFormat('ru-RU').format(card.price_sale * 1)

  const [hasAvif, setHasAvif] = useState(true)

  useEffect(() => {
    const img = new Image()
    const handleLoad = () => setHasAvif(true)
    const handleError = () => setHasAvif(false)

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)
    img.src = `/images/tovar/${card.image}.avif`

    return () => {
    img.removeEventListener('load', handleLoad)
    img.removeEventListener('error', handleError)
    img.src = ''
    }
  }, [card.image])

  return (
    <article 
      key={card.id} 
      id={String(card.id)} 
      className={product}
    >
      <div className={productTop}>
        {hasAvif ? (
          <picture className={productImage}>
            <source 
              srcSet={`/images/tovar/${card.image}.avif`} 
              type='image/avif' 
            />
            <img 
              loading='lazy'
              decoding='async'
              src={`/images/tovar/${card.image}.png`}
              alt='Товар'
            />
          </picture>
        ) : (
          <div className={productImage}>
            <img 
              loading='lazy'
              decoding='async'
              src={`/images/tovar/${card.image}.png`}
              alt='Товар'
            />
          </div>
        )}
        {sale !== 0 && <div className={productLabel}>-{sale}%</div>}
        {sale >= 20 && <div className={productSale}>выгодно</div>}
      </div>
      <div className={productBottom}>
        {price === price_sale ? (
          <>
            <div className={cx(productPrice, productPriceCountSame)}>
              <span className='text-nowrap'>{price} &#x20BD;</span> 
              <div className={productPriceCountSameTitle}>
                Обычная
              </div>
            </div>
            <div className={productTitle}>
              {card.nazvanie}
            </div>
          </>
        ) : (
          <>
            <div className={productPrices}>
              <div className={cx(productPrice, productPriceDiscount)}>
                <span className='text-nowrap'>{price_sale} &#x20BD;</span>
                <div className={productPriceDiscountTitle}>
                  Со скидкой
                </div>
              </div>
              <div className={cx(productPrice, productPriceCount)}>
                <span className='text-nowrap'>{price} &#x20BD;</span> 
                <div className={productPriceCountTitle}>
                  Обычная
                </div>
              </div>
            </div>
            <div className={productTitle}>
              {card.nazvanie}
            </div>
          </>
        )}
      </div>
    </article>
  )
}

const RecommendationsLoading = () => (
  <>
    <h2 className={styles['recommendation-loading']}>Загрузка рекомендаций...</h2>
    <div className='spinner-cards'></div>
  </>
)

const RecommendationsEmpty = () => (
  <h2 className={styles['recommendation-loading']}>Пока что рекомендации пусты</h2>
)

const RecommendationsContainer = ({ 
  cards, 
  containerRef,
  scrollHandlers,
  showLeftButton,
  showRightButton,
  scrollLeftBtn,
  scrollRightBtn
}: {
  cards: ICardsRender[]
  containerRef: RefObject<HTMLDivElement | null>
  scrollHandlers: IScrollHandlers
  showLeftButton: boolean
  showRightButton: boolean
  scrollLeftBtn: () => void
  scrollRightBtn: () => void
}) => {
  const {
    'recommendation__container': recommendationContainer,
    'recommendation__box': recommendationBox,
    'recommendation__left-btn': recommendationButtonLeft,
    'recommendation__right-btn': recommendationButtonRight
  } = styles

  return (
    <div className={recommendationBox}>
      {showLeftButton && (
        <ButtonArrow 
          onClick={scrollLeftBtn}
          ariaLabel='Листать рекомендуемые товары назад'
          className={recommendationButtonLeft}
        />
      )}
      {showRightButton && (
        <ButtonArrow 
          onClick={scrollRightBtn}
          ariaLabel='Листать рекомендуемые товары вперёд'
          className={recommendationButtonRight}
        />
      )}
      <div
        className={recommendationContainer}
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
}

const Recommendations = () => {
  const {
    'recommendation': recommendation,
    'recommendation__title': recommendationTitle
  } = styles

  const scrollAmount = 500

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)
  const [isSmoothScroll, setIsSmoothScroll] = useState<boolean>(true)
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false)
  const [showRightButton, setShowRightButton] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  
  const { cards, isLoading } = useRecommendations()

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const element = containerRef.current
      setShowLeftButton(element.scrollLeft > 0)
      setShowRightButton(element.scrollWidth - element.clientWidth > element.scrollLeft + 1)
    }

    const container = containerRef.current

    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll()    
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [cards])

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

  const handlePointerDown = (e: PointerEvent) => {
    if (!containerRef.current) return
    
    setIsDragging(true)
    setStartX(e.clientX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    containerRef.current.style.cursor = 'grabbing'
    setIsSmoothScroll(false)
  }

  const stopDragging = () => {
    setIsDragging(false)
    setIsSmoothScroll(true)

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
    }
  }

  const handlePointerLeave = stopDragging
  const handlePointerUp = stopDragging

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !containerRef.current) return

    e.preventDefault()
    const x = e.clientX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const scrollHandlers = {
    onPointerDown: handlePointerDown,
    onPointerLeave: handlePointerLeave,
    onPointerUp: handlePointerUp,
    onPointerMove: handlePointerMove,
    style: { scrollBehavior: isSmoothScroll ? 'smooth' : 'auto' } as const
  }

  return (
    <section className={recommendation}>
      <h2 className={recommendationTitle}>Рекомендации</h2>
      {isLoading ? (
        <RecommendationsLoading />
      ) : cards.length === 0 ? (
        <RecommendationsEmpty />
      ) : (
        <RecommendationsContainer
          cards={cards}
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





