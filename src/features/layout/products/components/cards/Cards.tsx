import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { IBasket } from '@/features/basket/types/basketTypes'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import type { ICardsRender } from '../../types/mainTypes'
import { useProductsContext } from '../../providers/ProductsProvider'
import { cx } from '@/shared/utils/classnames'
import { useFavourites } from '@/features/favourites/hooks/useFavourites'
import CardsHeartIcon from '@/shared/ui/icons/CardsHeartIcon'
import styles from './Cards.module.scss'
import { useBasket } from '@/features/basket/hooks/useBasket'

interface ICardProps {
  card: ICardsRender
  cartFavourites: IFav[]
  cartBasket: IBasket[]
}

const Cards = () => {
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const { cartBasket, addBasket, loadingAddBasket } = useBasket()
  const { searchQuery, isLoading, cards, currentPage } = useProductsContext()
  const { addFavourites, loadingAddFavourites, cartFavourites } = useFavourites()
  const { showNotification } = useUIContextNotification()

  const scrollPositionRef = useRef(0)
  const autoScrollRef = useRef(false)

  useEffect(() => {
    const handleUserScroll = () => {
      if (autoScrollRef.current) {
        autoScrollRef.current = false
      }
    }

    window.addEventListener('scroll', handleUserScroll)

    return () => window.removeEventListener('scroll', handleUserScroll)
  }, [])

  useEffect(() => {
    restoreScrollPosition()
  }, [])

  const handleAddBasket = useCallback((id: number) => {
    if (loadingAddBasket.has(id)) return
    saveScrollPosition()
    if (!isAuth) {
      showNotification('Войдите в аккаунт', 'error')
      return
    }
    if (cartBasket.some((item: IBasket) => item.id === id) || loadingAddBasket.has(id)) {
      showNotification('Уже в корзине', 'error')
      return
    }
    try {
      addBasket(id)
    } catch {
      showNotification('Ошибка', 'error')
    }
  }, [cartBasket, isAuth, loadingAddBasket, addBasket])

  const handleAddFav = useCallback((id: number) => {
    if (loadingAddFavourites.has(id)) return
    saveScrollPosition()
    if (!isAuth) {
      showNotification('Войдите в аккаунт', 'error')
      return
    }
    if (cartFavourites.some((item: IFav) => item.id === id) || loadingAddFavourites.has(id)) {
      showNotification('Уже в избранном', 'error')
      return
    }
    try {
      addFavourites(id)
    } catch {
      showNotification('Ошибка', 'error')
    }
  }, [isAuth, cartFavourites, loadingAddFavourites, addFavourites])

  useEffect(() => {
    const toUp = () => {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      })
    }

    toUp()
  }, [currentPage])

  const filteredCards = cards.filter((card: ICardsRender) => 
    card.nazvanie.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const saveScrollPosition = () => {
    autoScrollRef.current = true
    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop
  }

  const restoreScrollPosition = () => {
    if (autoScrollRef.current) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'auto'
      })
      autoScrollRef.current = false
    }
  }

  const Card = function Card (props: ICardProps) {
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

    const { card, cartFavourites, cartBasket } = props

    const price = Number(card.price)
    const priceSale = Number(card.price_sale)
    const salePercent = priceSale < price ? ((price - priceSale) / price) * 100 : 0
    const saleDisplay = salePercent > 0 ? (
      salePercent < 1 ? salePercent.toFixed(1) : Math.round(salePercent)
    ) : 0
    const isHighSale = salePercent >= 20

    const isInFavourites = cartFavourites.some(item => item.id_product === card.id)
    const isAddingFavourites = loadingAddFavourites.has(card.id)
    const isInBasket = cartBasket.some(item => item.id_product === card.id)
    const isAddingBasket = loadingAddBasket.has(card.id)

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
              onClick={() => handleAddFav(card.id)}
              className='button-reset'
            >
              <span className='visually-hidden'>
                {isInFavourites ? 
                  'Товар уже в избранном' : 
                  'Добавить в избранное'
                }
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
                    isInBasket || !isInBasket && isAddingBasket ?
                    productButtonDisabled :
                    productButtonActive
                  )
                }
                id={`card_${card.id}`}
                onClick={() => handleAddBasket(card.id)}>
                {isAddingBasket && !isInBasket ? 
                  'Добавление' : isInBasket ? 
                  'В корзине' : 'В корзину'
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
                    isInBasket || !isInBasket && isAddingBasket ?
                    productButtonDisabled :
                    productButtonActive
                  )
                }
                id={`card_${card.id}`}
                onClick={() => handleAddBasket(card.id)}>
                {isAddingBasket && !isInBasket ? 
                  'Добавление' : isInBasket ? 
                  'В корзине' : 'В корзину'
                }
              </button>
            </>
          )}
        </div>
      </article>
    )
  }

  return (
    <>
      {isLoading ? (
        <>
          <h2 className='centered-heading'>Загрузка товаров...</h2>
          <div className='spinner-cards'></div>
        </>
      ) : (
        <>
          {!isLoading && (searchQuery && filteredCards.length === 0 && !isLoading || cards.length === 0
          ) ? (
            <h2 className='centered-heading'>Товары отсутствуют</h2>
          ) : (
            <>
              <section className={styles.setka}>
                {cards.map((card: ICardsRender) => (
                  <Card 
                    key={card.id}
                    card={card}
                    cartFavourites={cartFavourites}
                    cartBasket={cartBasket}
                  />
                ))}
              </section>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Cards


