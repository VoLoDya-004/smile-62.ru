import { useState, useEffect, useContext, useCallback, useMemo, useTransition, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { memo } from 'react'
import axios, { AxiosError } from 'axios'
import ButtonLoad from '../../Button/ButtonLoad'
import Notification from '../../sub-components/Notification'
import { Context } from '../../../contexts/context'
import { setCartBasket } from '../../../redux/BasketSlice'
import type { RootStore } from '../../../redux'
import type { IProduct, INotificationData, ICardsRender } from '../../../types/types'


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
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
  const userId = useSelector((state: RootStore) => state.user.userId)
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const srcBasket = `http://localhost:3000/src/PHP/basket.php?idUser=${userId}&Operation=showBasket`

  const context = useContext(Context)
  if(!context) {
    throw new Error("Context must be used within a Provider")
  }
  const { cartFavourites, searchQuery,
    isLoading, cards, setCurrentPage, currentPage} = context
    
  const memoizedFavourites = useMemo(() => cartFavourites, [cartFavourites])
  const memoizedBasket = useMemo(() => cartBasket, [cartBasket])

  const [isPending, startTransition] = useTransition()

  const [pendingIdBasket, setPendingIdBasket] = useState<number | null>(null)
  const [pendingIdFav, setPendingIdFav] = useState<number | null>(null)
  const [localFavourites, setLocalFavourites] = useState<IProduct[]>([])
  const [localBasket, setLocalBasket] = useState<IProduct[]>([])
  const [addingStatus, setAddingStatus] = useState<Record<number, boolean>>({})
  const [notification, setNotification] = useState<INotificationData | null>(null)

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({message, type})
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  useEffect(() => {
    setLocalFavourites(cartFavourites)
  }, [cartFavourites])

  useEffect(() => {
    setLocalBasket(cartBasket)
  }, [cartBasket])

  const handleAddFav = useCallback((id: number) => {
    saveScrollPosition()
    if (!isAuth) {
      showNotification("войдите в аккаунт", "error")
      return
    }
    if (
      localFavourites.some(item => item.id === id) ||
      pendingIdFav === id
    ) {
      showNotification("товар уже в избранных", "success")
      return
    }
    setPendingIdFav(id)
    startTransition(() => {
      setLocalFavourites(prev => {
        if (prev.some(item => item.id === id)) return prev
        return [...prev, { id }]
      })
    })
    addFav(id).then(()=> {
      setPendingIdFav(null)
    }).catch(() => {
      setPendingIdFav(null)
    })
  }, [localFavourites, pendingIdFav, startTransition, isAuth])

  const handleAddBasket = useCallback((id: number) => {
    saveScrollPosition()
    if (!isAuth) {
      showNotification("войдите в аккаунт", "error")
      return
    }
    setAddingStatus(prev => ({ ...prev, [id]: true }))
    if (
      localBasket.some(item => item.id_product === id) ||
      pendingIdBasket === id
    ) {
      showNotification("товар уже в корзине", "success")
      return
    }
    setPendingIdBasket(id)
    startTransition(() => {
      setLocalBasket(prev => {
        if (prev.some(item => item.id_product === id)) return prev
        return [...prev, { id_product: id, id: id }]
      })
    })
    addBasket(id)
    .then(() => {
      setPendingIdBasket(null)
    })
    .then(() => {
    })
    .catch(() => {
      setPendingIdBasket(null)
    })
  }, [localBasket, pendingIdBasket, startTransition, isAuth])

  //сбрасываем скролл если пользователь сам скроллит
  const autoScrollRef = useRef(false)

  useEffect(() => {
    const handleUserScroll = () => {
      if (autoScrollRef.current) {
        autoScrollRef.current = false
      }
    }

    window.addEventListener('scroll', handleUserScroll)

    return () => {
      window.removeEventListener('scroll', handleUserScroll)
    }
  }, [])

  useEffect(() => {
    restoreScrollPosition()
  }, [pendingIdBasket, pendingIdFav, notification])
  
  const addBasket = useCallback(async (idProduct: number) => {
    const exists = memoizedBasket.some(item => item.id === idProduct)
    if (exists) {
      return
    } else {
      try {
        await axios.get(`http://localhost:3000/src/PHP/basket.php`, {
          params: {
            Operation: 'addBasket',
            idProduct: idProduct,
            idUser: userId,
          },
        })
        const res = await axios.get(srcBasket)
        dispatch(setCartBasket(res.data))
      } catch (error) {
        console.error("Ошибка при добавлении в корзину:", error)
        handleAxiosError(error)
      }
    }
  }, [cartBasket, userId])

  const addFav = useCallback(async (idProduct: number) => {
    const exists = memoizedFavourites.some(item => item.id === idProduct)
    if (exists) {
      return
    } else {
    try {
      await axios.get(`http://localhost:3000/src/PHP/favourites.php`, {
        params: {
          Operation: 'addFavourites',
          idProduct: idProduct,
          idUser: userId,
        },
      })
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error)
      handleAxiosError(error) // Функция для обработки ошибок
      }
    }
  }, [cartFavourites])

  // Функция для централизованной обработки ошибок Axios
  const handleAxiosError = (error: unknown) => {
    const axiosError = error as AxiosError
    if (axiosError.response) {
      // Сервер вернул код ошибки
      console.error("Server responded with status code:", axiosError.response.status)
      alert(`Server error: ${axiosError.response.status} - ${axiosError.response.statusText}`)
    } else if (axiosError.request) {
      // Запрос был сделан, но ответ не получен
      console.error("No response received:", axiosError.request)
      alert("No response from server. Please check your network connection.")
    } else {
      // Произошла ошибка при настройке запроса
      console.error("Error setting up the request:", axiosError.message)
      alert(`Request setup error: ${axiosError.message}`)
    }
  }

  //скролл при пагинации
  useEffect(() => {
    const toUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
    }
    toUp()
  }, [currentPage])

  // состояние кнопок пагинации
  useEffect(() => {
    const btn = document.getElementById("loadBtnBack")
    if (btn) {
      if (currentPage === 1) {
        btn.classList.add("load-more__btnBack_disabled")
      } else {
        btn.classList.remove("load-more__btnBack_disabled")
      }
    }
  }, [currentPage, cards])

  useEffect(() => {
    const btn = document.getElementById("loadBtnForward")

    if (btn) {
      if (cards.length < 40) {
        btn.classList.add("load-more__btnForward_disabled")
      } else {
        btn.classList.remove("load-more__btnForward_disabled")
      }
    }
  }, [cards])

  // поиск
  const filteredCards = cards.filter(card => 
    card.nazvanie.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Создаем ref для хранения позиции прокрутки
  const scrollPositionRef = useRef(0)

  // Функция для сохранения текущей позиции скролла
  const saveScrollPosition = () => {
    autoScrollRef.current = true
    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop
  }

  // Восстановление позиции скролла
  const restoreScrollPosition = () => {
    if (autoScrollRef.current) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'auto'
      })
      autoScrollRef.current = false
    }
  }

  
  const Card = memo(function Card (props: ICardProps) {
    const {card, isDarkTheme, localFavourites, localBasket, cartBasket} = props

    const sale = Math.round(100 * ((card.price - card.price_sale) / card.price))
    const price = Intl.NumberFormat('ru-RU').format(card.price * 1)
    const price_sale = Intl.NumberFormat('ru-RU').format(card.price_sale * 1)

    const isFav = localFavourites.some(item => item.id === card.id)
    const isInLocalBasket = localBasket.some(item => item.id_product === card.id)
    const isInBasket = cartBasket.some(item => item.id_product === card.id)


    return (
      <div key={card.id} id={String(card.id)} className={`card ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className="card__top">
          <div id={`card__heart_${card.id}`} className="card__heart">
            <svg 
              onClick={() => handleAddFav(card.id)} 
              width="23" 
              height="21" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path opacity=".6" fill={isFav ? "red" : ""} 
                d="M12.113 19.777a.98.98 0 0 1-1.246 0C5.327 15.102.85 10.749 1.004 6.985c0-2.764 2.093-5.693 5.743-5.973 1.274-.071 3.22.194 4.741 1.542 1.55-1.352 3.65-1.632 4.735-1.537 3.216.187 5.776 2.77 5.776 5.968.082 3.87-4.32 8.125-9.886 12.792Z"/>
              <path className="fill-clip-rule" 
                fill={isFav ? "red" : ""} 
                d="M7.225 3C4.805 3 3 4.796 3 7.082c0 1.36.91 3.034 2.65 5.023 1.554 1.777 3.621 3.644 5.85 5.574 2.229-1.93 4.296-3.797 5.85-5.574C19.09 10.116 20 8.443 20 7.081 20 4.796 18.194 3 15.775 3c-1.326 0-2.666.614-3.52 1.597a1 1 0 0 1-1.51 0C9.892 3.614 8.552 3 7.226 3ZM1 7.082C1 3.639 3.754 1 7.225 1c1.55 0 3.09.572 4.275 1.55A6.802 6.802 0 0 1 15.775 1C19.245 1 22 3.639 22 7.082c0 2.149-1.37 4.31-3.145 6.34-1.81 2.07-4.238 4.215-6.703 6.336a1 1 0 0 1-1.304 0c-2.465-2.12-4.892-4.266-6.703-6.336C2.369 11.392 1 9.23 1 7.082Z"/>
              <path className="fill-clip-rule" 
                fill="#fff" 
                d="M12.781 20.524a1.965 1.965 0 0 1-2.563 0c-2.47-2.126-4.956-4.323-6.825-6.462C1.593 12.002 0 9.6 0 7.066 0 3.057 3.216 0 7.208 0A7.77 7.77 0 0 1 11.5 1.322 7.77 7.77 0 0 1 15.792 0C19.784 0 23 3.057 23 7.065c0 2.534-1.592 4.937-3.393 6.997-1.869 2.14-4.356 4.336-6.825 6.463ZM11.5 2.512A6.825 6.825 0 0 1 15.792.955c3.484 0 6.25 2.651 6.25 6.11 0 2.16-1.375 4.331-3.158 6.37-1.817 2.081-4.255 4.237-6.73 6.367a1.003 1.003 0 0 1-1.309 0c-2.474-2.13-4.911-4.286-6.73-6.366C2.334 11.396.959 9.225.959 7.066c0-3.46 2.765-6.111 6.25-6.111 1.555 0 3.102.574 4.292 1.557ZM7.208 3.92c-1.919 0-3.283 1.395-3.283 3.146 0 .993.696 2.442 2.425 4.421 1.369 1.566 3.162 3.222 5.15 4.96 1.988-1.738 3.781-3.394 5.15-4.96 1.73-1.979 2.425-3.428 2.425-4.42 0-1.752-1.364-3.147-3.283-3.147-1.053 0-2.134.496-2.81 1.274a1.964 1.964 0 0 1-2.964 0c-.676-.778-1.757-1.274-2.81-1.274ZM11.5 17.714c-2.237-1.94-4.313-3.816-5.873-5.601-1.746-1.999-2.66-3.68-2.66-5.048 0-2.297 1.812-4.1 4.241-4.1 1.332 0 2.677.616 3.534 1.603a1.004 1.004 0 0 0 1.515 0c.858-.987 2.203-1.604 3.535-1.604 2.429 0 4.242 1.804 4.242 4.101 0 1.368-.915 3.05-2.661 5.048-1.56 1.785-3.636 3.662-5.873 5.6Z" />
            </svg>
          </div>
          <a className="card__image">
            <img src={card.image} alt="image" />
          </a>
          {sale !== 0 && <div className="card__label">-{sale}%</div>}
          {sale >= 20 && <div className="card__sale">выгодно</div>}
        </div>
        <div className="card__bottom">
          {price === price_sale ? (
            <>
              <div className="card__price card__price_count-same">{price}</div>
              <a className={`card__title ${isDarkTheme ? 'dark-theme' : ''}`}>{card.nazvanie}</a>
              <button
                type="button"
                className={isInLocalBasket ? "card__btn_disabled" : "card__btn"}
                id={`card_${card.id}`}
                disabled={isPending}
                onClick={() => {
                  handleAddBasket(card.id)
                }}
              >
                {addingStatus[card.id] && !isInBasket ? "Добавление" : isInBasket ? "В корзине" : "В корзину"}
              </button>
            </>
          ) : (
            <>
              <div className="card__prices">
                <div className="card__price card__price_discount">{price_sale}</div>
                <div className="card__price card__price_count">{price}</div>
                </div>
              <a className={`card__title ${isDarkTheme ? 'dark-theme' : ''}`}>{card.nazvanie}</a> 
              <button
                type="button"
                className={isInLocalBasket ? "card__btn_disabled" : "card__btn"}
                id={`card_${card.id}`}
                disabled={isPending}
                onClick={() => {
                  handleAddBasket(card.id) 
                }}
              >
                {addingStatus[card.id] && !isInBasket ? "Добавление" : isInBasket ? "В корзине" : "В корзину"}
              </button>
            </>
          )}
        </div>
      </div>
    )
  })


  return (
    <>
      {isLoading ? (
        <>
          <h1 style={{textAlign: 'center'}}>Загрузка товаров...</h1>
          <div className="spinnerCards"></div>
        </>
      ) : (
        <>
        { !isLoading && (searchQuery && filteredCards.length === 0 && !isLoading || 
        cards.length === 0) ? (
          <h1 style={{textAlign: 'center'}}>Товары отсутствуют</h1>
        ) : (
          <>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
            <div className={`setka ${isDarkTheme ? "dark-theme" : ""}`}>
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
            </div>

            <div className="load-moreBox">
              <div className="load-moreBack">
              <ButtonLoad 
                id="loadBtnBack" 
                className="load-more__btnBack"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                  } else if (currentPage === 1) {
                  } else {
                    setCurrentPage(currentPage)
                  }
                }}
              >
                Назад
              </ButtonLoad>
              </div>
              <div className="load-moreForward">
              <ButtonLoad 
                id="loadBtnForward" 
                className="load-more__btnForward"
                onClick={() => {
                  if (cards.length === 40) {
                    setCurrentPage(currentPage + 1)
                  } else {
                    setCurrentPage(currentPage)
                  }
                }}
              >
                Вперед
              </ButtonLoad>
              </div>
            </div>
          </>
        )}
        </>
      )}
    </>
  )
}

export default memo(Cards)























