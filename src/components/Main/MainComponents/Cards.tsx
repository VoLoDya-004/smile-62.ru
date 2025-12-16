import { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Context } from '@/contexts/context'
import type { RootStore } from '@/redux'
import type { IProduct, ICardsRender } from '@/types/types'
import { BasketService } from '@/services/basketService'
import { FavouritesService } from '@/services/favouritesService'
import CardsHeartIcon from '@/components/Icons/CardsHeartIcon'

interface ICardProps {
  card: ICardsRender
  isDarkTheme: boolean
  localFavourites: IProduct[]
  localBasket: IProduct[]
  cartBasket: IProduct[]
}

const Cards = () => {
  const dispatch = useDispatch()
  const cartBasket = useSelector((state: RootStore) => state.basket.cartBasket)
  const cartFavourites = useSelector((state: RootStore) => state.favourites.cartFavourites)
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
  const userId = useSelector((state: RootStore) => state.user.userId)
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const context = useContext(Context) 
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { 
    searchQuery,
    isLoading, 
    cards, 
    currentPage,
    updateFavouritesData,
    setLoadingBasket,
    setLoadingFavourites,
    showNotification
  } = context

  const basketService = useMemo(() => new BasketService(dispatch), [])
  const favouritesService = useMemo(() => new FavouritesService(dispatch), [])
    
  const memoizedFavourites = useMemo(() => cartFavourites, [cartFavourites])
  const memoizedBasket = useMemo(() => cartBasket, [cartBasket])

  const [pendingIdBasket, setPendingIdBasket] = useState<number | null>(null)
  const [pendingIdFav, setPendingIdFav] = useState<number | null>(null)
  const [localFavourites, setLocalFavourites] = useState<IProduct[]>([])
  const [localBasket, setLocalBasket] = useState<IProduct[]>([])
  const [addingStatusBasket, setAddingStatusBasket] = useState<Record<number, boolean>>({})
  const [addingStatusFav, setAddingStatusFav] = useState<Record<number, boolean>>({})

  const scrollPositionRef = useRef(0)

  useEffect(() => {
    setLocalFavourites(cartFavourites)
  }, [cartFavourites])

  useEffect(() => {
    setLocalBasket(cartBasket)
  }, [cartBasket])

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
  }, [pendingIdBasket, pendingIdFav])

  const addBasket = useCallback(async (idProduct: number) => {
    const exists = memoizedBasket.some(item => item.id === idProduct)

    if (!exists) {
      setLoadingBasket(true)
      await basketService.addBasket(idProduct, userId)
      setLoadingBasket(false)
    }
  }, [cartBasket, userId])

  const handleAddBasket = useCallback(async (id: number) => {
    if (addingStatusBasket[id]) return
    
    saveScrollPosition()
    if (!isAuth) {
      showNotification('Войдите в аккаунт', 'error')
      return
    }

    if (localBasket.some(item => item.id_product === id) || pendingIdBasket === id) {
      showNotification('Уже в корзине', 'error')
      return
    }

    setAddingStatusBasket(prev => ({ ...prev, [id]: true }))
    setPendingIdBasket(id)

    try {
      await addBasket(id)
      setLocalBasket(prev => {
        if (prev.some(item => item.id_product === id)) return prev
        return [...prev, { id_product: id, id: id }]
      })
      showNotification('Добавлено в корзину', 'success')
    } catch {
      showNotification('Ошибка', 'error')
    } finally {
      setAddingStatusBasket(prev => ({ ...prev, [id]: false }))
      setPendingIdBasket(null)
    }
  }, [localBasket, pendingIdBasket, isAuth, addingStatusBasket, addBasket])

  const addFav = useCallback(async (idProduct: number) => {
    const exists = memoizedFavourites.some(item => item.id === idProduct)

    if (!exists) {
      setLoadingFavourites(true)
      await favouritesService.addFavourites(idProduct, userId)
      setLoadingFavourites(false)
    }
  }, [cartFavourites, userId])

  const handleAddFav = useCallback(async (id: number) => {
    saveScrollPosition()

    if (localFavourites.some(item => item.id === id)) {
      showNotification('Уже в избранных', 'error')
      return
    } else {
      if (addingStatusFav[id] || pendingIdFav === id) {
        return
      }

      if (!isAuth) {
        showNotification('Войдите в аккаунт', 'error')
        return
      }

      setAddingStatusFav(prev => ({ ...prev, [id]: true }))
      setPendingIdFav(id)

      try {
        await addFav(id)
        setLocalFavourites(prev => {
          if (prev.some(item => item.id_product === id)) return prev
          return [...prev, { id_product: id, id: id }]
        })
        showNotification('Добавлено в избранное', 'success')
        updateFavouritesData()
      } catch {
        setLocalFavourites(prev => prev.filter(item => item.id_product === id))
        showNotification('Ошибка', 'error')
      } finally {
        setAddingStatusFav(prev => ({ ...prev, [id]: false }))
        setPendingIdFav(null)
      }
    }
  }, [localFavourites, pendingIdFav, isAuth, addingStatusFav, addFav])

  useEffect(() => {
    const toUp = () => {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      })
    }

    toUp()
  }, [currentPage])

  const filteredCards = cards.filter(card => 
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
    const { card, isDarkTheme, localFavourites, localBasket, cartBasket } = props

    const sale = Math.round(100 * ((card.price - card.price_sale) / card.price))
    const price = Intl.NumberFormat('ru-RU').format(card.price * 1)
    const price_sale = Intl.NumberFormat('ru-RU').format(card.price_sale * 1)

    const isInFav = cartFavourites.some(item => item.id_product === card.id)
    const isInLocalFav = localFavourites.some(item => item.id === card.id)
    const isInBasket = cartBasket.some(item => item.id_product === card.id)
    const isInLocalBasket = localBasket.some(item => item.id_product === card.id)

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
        className={`card ${isDarkTheme ? 'dark-theme' : ''}`}
      >
        <div className='card__top'>
          <div 
            id={`card__heart_${card.id}`} 
            className='card__heart'
          >
            <button
              type='button'
              onClick={() => handleAddFav(card.id)}
              disabled={addingStatusFav[card.id]}
              className='button-reset'
            >
              <span className='visually-hidden'>
                  {isInFav ? 
                    'Товар уже в избранном' : 
                    'Добавить в избранное'
                  }
              </span>
              <CardsHeartIcon
                addingStatusFav={addingStatusFav}
                isInLocalFav={isInLocalFav}
                card={card}
              />
            </button>
          </div>
          {hasAvif ? (
            <picture className='card__image'>
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
            <div className='card__image'>
              <img 
                loading='lazy'
                decoding='async'
                src={`/images/tovar/${card.image}.png`}
                alt='Товар'
              />
            </div>
          )}
          {sale !== 0 && <div className='card__label'>-{sale}%</div>}
          {sale >= 20 && <div className='card__sale'>выгодно</div>}
        </div>
        <div className='card__bottom'>
          {price === price_sale ? (
            <>
              <div className='card__price card__price-count-same'>
                <span className='text-nowrap'>{price} &#x20BD;</span>
                <div className='card__price-count-same-title'>Обычная</div>
              </div>
              <div className={`card__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                {card.nazvanie}
              </div>
              <button
                type='button'
                className={`
                  card__btn 
                  ${isInLocalBasket || !isInLocalBasket && addingStatusBasket[card.id] ? 
                    'card__btn_disabled' : 
                    'card__btn_active'
                  }
                `}
                id={`card_${card.id}`}
                onClick={() => handleAddBasket(card.id)}>
                {addingStatusBasket[card.id] && !isInBasket ? 'Добавление' : isInBasket ? 
                  'В корзине' : 'В корзину'
                }
              </button>
            </>
          ) : (
            <>
              <div className='card__prices'>
                <div className='card__price card__price-discount'>
                  <span className='text-nowrap'>{price_sale} &#x20BD;</span>
                  <div className='card__price-discount-title'>Со скидкой</div>
                </div>
                <div className='card__price card__price-count'>
                  <span className='text-nowrap'>{price} &#x20BD;</span> 
                  <div className='card__price-count-title'>Обычная</div>
                </div>
                </div>
              <div className={`card__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                {card.nazvanie}
              </div> 
              <button
                type='button'
                className={`
                  card__btn 
                  ${isInLocalBasket || !isInLocalBasket && addingStatusBasket[card.id] ? 
                    'card__btn_disabled' : 
                    'card__btn_active'
                  }
                `}
                id={`card_${card.id}`}
                onClick={() => handleAddBasket(card.id)}>
                {addingStatusBasket[card.id] && !isInBasket ? 
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
              <section className={`setka ${isDarkTheme ? 'dark-theme' : ''}`}>
                {cards.map((card) => (
                  <Card 
                    key={card.id}
                    card={card}
                    isDarkTheme={isDarkTheme}
                    localFavourites={localFavourites}
                    localBasket={localBasket}
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


