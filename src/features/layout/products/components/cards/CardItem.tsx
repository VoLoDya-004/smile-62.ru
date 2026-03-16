import { useState, useEffect, memo } from 'react'
import type { ICardsRender } from '../../types/mainTypes'
import { cx } from '@/shared/utils/classnames'
import CardsHeartIcon from '@/shared/ui/icons/CardsHeartIcon'
import styles from './Cards.module.scss'

interface ICardItemProps {
  card: ICardsRender
  isInFavourites: boolean
  isInBasket: boolean
  isAddingFavourites: boolean
  isAddingBasket: boolean
  onAddFav: (id: number) => void
  onAddBasket: (id: number) => void
}

const CardItem = memo(({
  card,
  isInFavourites,
  isInBasket,
  isAddingFavourites,
  isAddingBasket,
  onAddFav,
  onAddBasket
}: ICardItemProps) => {
  const {
    'card': product,
    'card__top': productTop,
    'card__heart': productHeart,
    'card__image': productImage,
    'card__label': productLabel, 
    'card__sale': productSale,
    'card__bottom': productBottom,
    'card__price': productPrice,
    'card__price-count': productPriceCount,
    'card__price-count-title': productPriceCountTitle,
    'card__price-count-same': productPriceCountSame,
    'card__price-count-same-title': productPriceCountSameTitle,
    'card__title': productTitle,
    'card__btn': productButton,
    'card__btn_disabled': productButtonDisabled,
    'card__btn_active': productButtonActive,
    'card__prices': productPrices,
    'card__price-discount': productPriceDiscount,
    'card__price-discount-title': productPriceDiscountTitle
  } = styles

  const price = Number(card.price)
  const priceSale = Number(card.price_sale)
  const salePercent = priceSale < price ? ((price - priceSale) / price) * 100 : 0
  const saleDisplay = salePercent > 0 ? (
    salePercent < 1 ? salePercent.toFixed(1) : Math.round(salePercent)
  ) : 0
  const isHighSale = salePercent >= 20

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
    <article key={card.id} id={String(card.id)} className={product}>
      <div className={productTop}>
        <div id={`card__heart_${card.id}`} className={productHeart}>
          <button
            type='button'
            disabled={isInFavourites || isAddingFavourites}
            onClick={() => onAddFav(card.id)}
            className='button-reset'
          >
            <span className='visually-hidden'>
              {isInFavourites ? 'Товар уже в избранном' : 'Добавить в избранное'}
            </span>
            <CardsHeartIcon
              isInFavourites={isInFavourites}
              addingStatusFav={isAddingFavourites}
            />
          </button>
        </div>
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
        {+saleDisplay > 0 && <div className={productLabel}>-{saleDisplay}%</div>}
        {isHighSale && <div className={productSale}>выгодно</div>}
      </div>
      <div className={productBottom}>
        {price === priceSale ? (
          <>
            <div className={cx(productPrice, productPriceCountSame)}>
              <span className='text-nowrap'>{price} ₽</span>
              <div className={productPriceCountSameTitle}>Обычная</div>
            </div>
            <div className={productTitle}>
              {card.nazvanie}
            </div>
            <button
              type='button'
              disabled={isAddingBasket || isInBasket}
              className={
                cx(
                  productButton,
                  isInBasket || (!isInBasket && isAddingBasket) ?
                  productButtonDisabled :
                  productButtonActive
                )
              }
              id={`card_${card.id}`}
              onClick={() => onAddBasket(card.id)}>
              {isAddingBasket && !isInBasket ? 
                'Добавление' : 
                isInBasket ? 
                'В корзине' : 
                'В корзину'
              }
            </button>
          </>
        ) : (
          <>
            <div className={productPrices}>
              <div className={cx(productPrice, productPriceDiscount)}>
                <span className='text-nowrap'>{priceSale} ₽</span>
                <div className={productPriceDiscountTitle}>Со скидкой</div>
              </div>
              <div className={cx(productPrice, productPriceCount)}>
                <span className='text-nowrap'>{price} ₽</span> 
                <div className={productPriceCountTitle}>Обычная</div>
              </div>
            </div>
            <div className={productTitle}>
              {card.nazvanie}
            </div> 
            <button
              type='button'
              disabled={isAddingBasket || isInBasket}
              className={
                cx(
                  productButton,
                  isInBasket || (!isInBasket && isAddingBasket) ?
                  productButtonDisabled :
                  productButtonActive
                )
              }
              id={`card_${card.id}`}
              onClick={() => onAddBasket(card.id)}>
              {isAddingBasket && !isInBasket ? 
                'Добавление' : 
                isInBasket ? 
                'В корзине' : 
                'В корзину'
              }
            </button>
          </>
        )}
      </div>
    </article>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.card.price === nextProps.card.price &&
    prevProps.card.price_sale === nextProps.card.price_sale &&
    prevProps.card.nazvanie === nextProps.card.nazvanie &&
    prevProps.card.image === nextProps.card.image &&
    prevProps.isInFavourites === nextProps.isInFavourites &&
    prevProps.isInBasket === nextProps.isInBasket &&
    prevProps.isAddingFavourites === nextProps.isAddingFavourites &&
    prevProps.isAddingBasket === nextProps.isAddingBasket
  )
})

export default CardItem