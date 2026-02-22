import { useCallback, useEffect, useState, type RefObject } from 'react'
import { useRecommendations } from '@/shared/hooks'
import type { ICardsRender } from '@/features/layout/products/types/mainTypes'
import type { IScrollHandlers } from './types/recommendationsTypes'
import { cx } from '@/shared/utils/classnames'
import ButtonArrow from '@/shared/ui/buttons/ButtonArrow'
import styles from './Recommendations.module.scss'
import { useDragScroll } from '@/shared/hooks/shared/useDragScroll'

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
              <span className='text-nowrap'>{price} ₽</span> 
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
                <span className='text-nowrap'>{price_sale} ₽</span>
                <div className={productPriceDiscountTitle}>
                  Со скидкой
                </div>
              </div>
              <div className={cx(productPrice, productPriceCount)}>
                <span className='text-nowrap'>{price} ₽</span> 
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

  const updateButtons = useCallback((scrollLeft: number) => {
    if (!containerRef.current) return
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(
      containerRef.current.scrollWidth - containerRef.current.clientWidth > scrollLeft + 1
    )
  }, [])

  const { cards, isLoading } = useRecommendations()
  const { containerRef, isDragging, dragHandlers } = useDragScroll({
    onScroll: updateButtons
  })

  const [isSmoothScroll, setIsSmoothScroll] = useState(true)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  useEffect(() => {
    if (isDragging) {
      setIsSmoothScroll(false)
    } else {
      setIsSmoothScroll(true)
    }
  }, [isDragging])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => updateButtons(container.scrollLeft)
    container.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => container.removeEventListener('scroll', handleScroll)
  }, [updateButtons, cards])

  const scrollLeftBtn = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 500
    }
  }

  const scrollRightBtn = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 500
    }
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
          scrollHandlers={{
            ...dragHandlers,
            style: { scrollBehavior: isSmoothScroll ? 'smooth' : 'auto' } as const,
          }}
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







