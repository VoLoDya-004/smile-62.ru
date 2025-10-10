import { Routes, Route, useSearchParams } from 'react-router-dom'
import { Context } from './contexts/context'
import { useState, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/UserSlice'
import  {setCartBasket} from './redux/BasketSlice'
import { setIsDarkTheme } from './redux/ThemeSlice'
import type { RootStore } from './redux'
import type { IFilters, ICardsRender, IFav } from './types/types' 
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Basic from './components/Basic/Basic'
import Favourites from './components/Favourites/Favourites'
import Profile from './components/Profile/Profile'
import Basket from './components/Basket/Basket'
import ProgressBar from './components/sub-components/ProgressBar'
import ScrollButton from './components/Button/ScrollButton'
import ChatBtn from './components/Button/ChatBtn'
import BasketProducts from './components/Basket/BasketComponents/BasketProducts'
import FavouritesProducts from './components/Favourites/FavouritesComponents/FavouritesProducts'
import Support from './components/sub-components/Support'
import CookiesNotice from './components/sub-components/CookiesNotice'
import ConfirmModal from './components/sub-components/ConfirmModal'


const App = () => {
  const userId = useSelector((state: RootStore) => state.user.userId)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      const { isAuth, userName, userId } = JSON.parse(storedAuth)
      if (isAuth && userId !== null) {
        dispatch(setUser({ userId, userName, isAuth }))
      }
    }
  }, [])

  //работа с корзиной

  const srcBasket = `/backend/PHP/basket.php?idUser=${userId}&Operation=showBasket`

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)
  const [isPendingDelete, setIsPendingDelete] = useState<Record<number, boolean>>({})

  const [isModalOpenAllBasket, setIsModalOpenAllBasket] = useState(false)
  const [isModalOpenAllFav, setIsModalOpenAllFav] = useState(false)
  const [loadingDeleteAllBasket, setLoadingDeleteAllBasket] = useState(false)
  const [loadingDeleteAllFav, setLoadingDeleteAllFav] = useState(false)
  const [loadingFavourites, setLoadingFavourites] = useState(true)
  const [loadingBasket, setLoadingBasket] = useState(true)

  const dispatch = useDispatch()
  const cartBasket = useSelector((state: RootStore) => state.basket.cartBasket)

  const deleteProductBasket = useCallback((idToDelete: number | null) => {
    if (idToDelete && userId !== null) {
      setIsModalOpen(false)
      setIsPendingDelete(prev => ({ ...prev, [idToDelete]: true }))
      axios.get(`/backend/PHP/basket.php`, {
        params: {
          Operation: 'deleteBasket',
          idProduct: idToDelete,
          idUser: userId,
        },
      })
      .then(() => {
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
        setIsPendingDelete(prev => ({ ...prev, [idToDelete]: false }))
      })
      .catch(() => {
        setIsPendingDelete(prev => ({ ...prev, [idToDelete]: false }))
      })
    }
  }, [dispatch, productIdToDelete, srcBasket, setIsPendingDelete])

  const handleClearBasket = useCallback(() => {
    if (userId !== null) {
      setIsModalOpenAllBasket(false)
      setLoadingDeleteAllBasket(true)
      axios.get(`/backend/PHP/basket.php`, {
        params: {
          Operation: 'clearBasket',
          idUser: userId,
        }
      })
      .then(() => {
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
        closeModalAllBasket()
        setLoadingDeleteAllBasket(false)
      })
      .catch(() => {
        closeModalAllBasket()
        setLoadingDeleteAllBasket(false)
      })
    }
  }, [dispatch, userId])

  const showModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(true)
  }, [setIsModalOpenAllBasket])

  const closeModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(false)
  }, [setIsModalOpenAllBasket])

  const handleClearBasketBtn = useCallback(() => {
    showModalAllBasket()
  }, [showModalAllBasket])

  const showModal = useCallback((id: number) => {
    setProductIdToDelete(id)
    setIsModalOpen(true)
  }, [setIsModalOpen, setProductIdToDelete, setIsPendingDelete])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [setIsModalOpen, setProductIdToDelete])

  const increaseBasket = useCallback((id: number, currentCount: number) => {
    if (userId !== null) {
      if (currentCount >= 100) return
      axios.get(`/backend/PHP/basket.php`, {
        params: {
          Operation: 'increaseBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => {
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
      })
    }
  }, [dispatch, srcBasket])

  const decreaseBasket = useCallback((id: number, currentCount: number) => {
    if (userId !== null) {
      if (currentCount <= 1) return
      axios.get(`/backend/PHP/basket.php`, {
        params: {
          Operation: 'decreaseBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => {
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
      })
    }
  }, [dispatch, srcBasket])

  const handleCountChange = useCallback((e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (userId !== null) {
      let newCount = e.target.value
      if (newCount === '') {
        newCount = '1'
      } else {
        let parsedCount = parseInt(newCount, 10)
        if (isNaN(parsedCount) || parsedCount < 1) return
        if (parsedCount > 100) parsedCount = 100
      }
      axios.get(`/backend/PHP/basket.php`, {
        params: {
          Operation: 'updateCount',
          idProduct: id,
          count: newCount,
          idUser: userId,
        }
      })
      .then(() => {
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
      })
    }
  }, [dispatch, srcBasket])

  useEffect(() => {
    if (userId !== null) {
      setLoadingBasket(true)
      axios.get(srcBasket)
        .then((res) => {
          dispatch(setCartBasket(res.data))
        })
        .finally(() => {
          setLoadingBasket(false)
        })
    } else {
      setLoadingBasket(false)
      dispatch(setCartBasket([]))
    }
  }, [userId])

  const productsBasket = useMemo(() => {
  return cartBasket.map((productBasket) => {
    return (
      <BasketProducts 
        productBasket = {productBasket} key = {productBasket.id} 
        openDeleteModal = {() => showModal(productBasket.id)} 
        onChange={handleCountChange}
        isPendingDelete={isPendingDelete[productBasket.id]}
      />
    )
  })
  }, [
      cartBasket, 
      deleteProductBasket, 
      increaseBasket, 
      decreaseBasket, 
      handleCountChange, 
      showModal
  ])

  //работа с избранными товарами

  const srcFavourites = 
    `/backend/PHP/favourites.php?idUser=${userId}&Operation=showFavourites`

  const [cartFavourites, setCartFavourites] = useState<IFav[]>([])

  const deleteProductFavourites = useCallback((id: number) => {
    if (userId !== null) {
      axios.get(`/backend/PHP/favourites.php`, {
        params: {
          Operation: 'deleteFavourites',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => {
        setCartFavourites(prevFavourites => prevFavourites.filter(item => item.id !== id))
      })
    }
  }, [setCartFavourites, userId])

  const handleClearFav = useCallback(() => {
    if (userId !== null) {
      setIsModalOpenAllFav(false)
      setLoadingDeleteAllFav(true)
      axios.get(`/backend/PHP/favourites.php`, {
        params: {
          Operation: 'clearFavourites',
          idUser: userId,
        }
      })
      .then(() => {
        return axios.get(srcFavourites)
      })
      .then((res) => {
          setCartFavourites(res.data)
          closeModalAllFav()
          setLoadingDeleteAllFav(false)
      })
      .catch(() => {
        setLoadingDeleteAllFav(false)
        closeModalAllFav()
      })
    }
  }, [setCartFavourites, userId])

  const showModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(true)
  }, [setIsModalOpenAllFav])

  const closeModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(false)
  }, [setIsModalOpenAllFav])

  const handleClearFavBtn = useCallback(() => {
    showModalAllFav()
  }, [showModalAllFav])

  const addInBasketProductFavourites = useCallback(async (id: number): Promise<void> => {
    if (userId === null) {
      return
    }

    await axios.get(`/backend/PHP/favourites.php`, {
      params: {
        Operation: 'addBasket',
        idProduct: id,
        idUser: userId,
      }
    })
    const res = await axios.get(srcFavourites)
    setCartFavourites(res.data)
  }, [setCartFavourites, userId])

  useEffect(() => {
    if (userId !== null) {
      setLoadingFavourites(true)
      axios.get(srcFavourites)
        .then((res) => {
          setCartFavourites(res.data)
        })
        .finally(() => {
          setLoadingFavourites(false)
        })
    } else {
      setLoadingFavourites(false)
      setCartFavourites([])
    }
  }, [userId])

  const productsFavourites = useMemo(() => {
  return cartFavourites.map((productFavourites) => {
    return (
      <FavouritesProducts 
        productFavourites = {productFavourites} key = {productFavourites.id} 
        deleteProductFavourites = {deleteProductFavourites}
        addInBasketProductFavourites = {addInBasketProductFavourites}
        cartBasket={cartBasket} cartFavourites={cartFavourites}
      />
    )
  })
  }, [cartFavourites, deleteProductFavourites, addInBasketProductFavourites, cartBasket])

  // обновление избранных товаров без обновления страницы

  useEffect(() => {
    if (userId !== null) {
      const observer = new MutationObserver(() => {
        const buttons = document.querySelectorAll('.card__heart')

        if (buttons.length > 0) {
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              axios.get(`/backend/PHP/favourites.php`, {
                params: {
                  Operation: 'showFavourites',
                  idUser: userId,
                }
              })
              .then(() => {
                return axios.get(srcFavourites)
              })
              .then((res) => {
                setCartFavourites(res.data)
              })
            })
          })
        }
      })

      observer.observe(document.body, { 
          childList: true,
          subtree: true
      })
      return () => {
        observer.disconnect()
        const buttons = document.querySelectorAll('.card__heart')
        buttons.forEach(button => {
          button.removeEventListener('click', () => { 
            axios.get(`/backend/PHP/favourites.php`, {
              params: {
                Operation: 'showFavourites',
                idUser: userId,
              }
            })
            .then(() => {
              return axios.get(srcFavourites)
            })
            .then((res) => {
              setCartFavourites(res.data)
            })
          })
        })
      }
    }
  }, [userId])

  // обновление корзины товаров из избранных без обновления страницы

  useEffect(() => {
    if (userId !== null) {
      const observer = new MutationObserver(() => {
        const buttons = document.querySelectorAll('.basket-box__product-controls') 

        if (buttons.length > 0) {
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              axios.get(`/backend/PHP/favourites.php`, {
                params: {
                  Operation: 'showBasket',
                  idUser: userId,
                }
              })
              .then(() => {
                return axios.get(srcBasket)
              })
              .then((res) => {
                dispatch(setCartBasket(res.data))
              })
            })
          })
        }
      })

      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [dispatch, userId])

  //поиск

  const[searchQuery, setSearchQuery] = useState(() => {
    const savedSearch = sessionStorage.getItem('searchQuery')
    return savedSearch || ''
  })

  useEffect(() => {
    if (searchQuery) {
      sessionStorage.setItem('searchQuery', searchQuery)
    } else {
      sessionStorage.removeItem('searchQuery')
    }
  }, [searchQuery])

  //пагинация

  const [currentPage, setCurrentPage] = useState(1)

  //меню товаров

  const [selectedCategory, setSelectedCategory] = useState<number | null>(() => {
      const categoryFromUrl = searchParams.get('category')
      return categoryFromUrl ? parseInt(categoryFromUrl) : 0
  })

  const categories = [
      { id: 0, label: 'Все категории' },
      { id: 1, label: 'Ноутбуки' },
      { id: 2, label: 'Смартфоны' },
      { id: 3, label: 'Планшеты' },
      { id: 4, label: 'Телевизоры' },
      { id: 5, label: 'Компьютеры' },
      { id: 6, label: 'Красота и здоровье' },
      { id: 7, label: 'Техника для кухни' },
      { id: 8, label: 'Аудиотехника' },
      { id: 9, label: 'Фото и видео' },
      { id: 10, label: 'Аксессуары' },
      { id: 11, label: 'Сад и огород' },
      { id: 12, label: 'Офис' },
      { id: 13, label: 'Умные устройства' },
      { id: 14, label: 'Автотовары' },
      { id: 15, label: 'Сетевое оборудование' },
      { id: 16, label: 'Кабели и адаптеры' },
      { id: 17, label: 'Электронные книги' },
      { id: 18, label: 'Климатическая техника' },
      { id: 19, label: 'Техника для творчества' },
      { id: 20, label: 'Отдых и развлечения' },
      { id: 21, label: 'VR-гарнитуры' },
      { id: 22, label: 'Устройства для безопасности' },
      { id: 23, label: 'Техника для ремонта' },
      { id: 24, label: 'Техника для дома' },
  ]

  // карточки на главной

  const [cards, setCards] = useState<ICardsRender[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // сортировка товаров

  const [sortType, setSortType] = useState(() => {
      return searchParams.get('sort') || 'default'
  })
  const [activeCategoryId, setActiveCategoryId] = useState(() => {
      const categoryFromUrl = searchParams.get('category')
      return categoryFromUrl ? parseInt(categoryFromUrl) : 0
  })

  const [currentSort, setCurrentSort] = useState(() => {
    const sortFromUrl = searchParams.get('sort')

    switch (sortFromUrl) {
      case 'cheap':
        return 'Дешевле'
      case 'expensive':
        return 'Дороже'
      case 'discount':
        return 'По скидке (%)'
      case 'default': 
        return 'По умолчанию'
      default: 
        return 'По умолчанию'
    }
  })

  // фильтры

  const [filters, setFilters] = useState<IFilters>(() => {
    const savedFilters = sessionStorage.getItem('productFilters')
    if (savedFilters) {
      return JSON.parse(savedFilters)
    }

    return {
      minPrice: null,
      maxPrice: null,
      actions: {
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
        action7: false,
        action8: false,
      }
    }
  })

  useEffect(() => {
    sessionStorage.setItem('productFilters', JSON.stringify(filters))
  }, [filters])

  const handleFiltersChange = (newFilters: IFilters) => {
    setFilters(newFilters)
  }

  //загрузка карточек со всеми параметрами

  useEffect(() => {
    const newSearchParams = new URLSearchParams()

    if (selectedCategory !== 0 && selectedCategory !== null) {
      newSearchParams.set('category', selectedCategory.toString())
    }

    if (sortType !== 'default') {
      newSearchParams.set('sort', sortType)
    }

    setSearchParams(newSearchParams)
  }, [selectedCategory, sortType, setSearchParams])

  const [totalItems, setTotalItems] = useState(0)

  const fetchCards = useCallback(async () => {
  setIsLoading(true)
    try {
      const response = await axios.get(`/backend/PHP/getCards.php`, {
        params: {
          page: currentPage,
          search: searchQuery,
          idCategory: selectedCategory === 0 ? null : selectedCategory,
          sortType: sortType,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          action1: filters.actions.action1 ? '1' : '0',
          action2: filters.actions.action2 ? '1' : '0',
          action3: filters.actions.action3 ? '1' : '0',
          action4: filters.actions.action4 ? '1' : '0',
          action5: filters.actions.action5 ? '1' : '0',
          action6: filters.actions.action6 ? '1' : '0',
          action7: filters.actions.action7 ? '1' : '0',
          action8: filters.actions.action8 ? '1' : '0',
        },
      })
      setCards(response.data.items)
      setTotalItems(response.data.total)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery, selectedCategory, sortType, filters])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  //Инициализация темы при запуске приложения

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    dispatch(setIsDarkTheme(theme === 'dark-theme'))
  }, [dispatch])

  // мемоизация данных из контекста

  const contextValue = useMemo(() => ({
    productsFavourites,
    setSelectedCategory,
    setCurrentPage,
    categories,
    activeCategoryId,
    setActiveCategoryId,
    setSearchQuery,
    handleClearFavBtn,
    loadingDeleteAllFav,
    handleClearBasketBtn,
    loadingDeleteAllBasket,
    cartFavourites,
    searchQuery,
    isLoading,
    cards,
    currentPage,
    setSortType,
    handleFiltersChange,
    currentSort,
    setCurrentSort,
    fetchCards,
    totalItems,
    filters,
    deleteProductFavourites,
    addInBasketProductFavourites,
    cartBasket,
    selectedCategory,
    setCards,
    sortType,
    setCartBasket
  }), [
    productsFavourites,
    setSelectedCategory,
    setCurrentPage,
    categories,
    activeCategoryId,
    setActiveCategoryId,
    setSearchQuery,
    handleClearFavBtn,
    loadingDeleteAllFav,
    handleClearBasketBtn,
    loadingDeleteAllBasket,
    cartFavourites,
    searchQuery,
    isLoading,
    cards,
    currentPage,
    setSortType,
    handleFiltersChange,
    currentSort,
    setCurrentSort,
    fetchCards,
    totalItems,
    filters,
    deleteProductFavourites,
    addInBasketProductFavourites,
    cartBasket,
    selectedCategory,
    setCards,
    sortType,
    setCartBasket
  ])

  
  return (
    <>
      <Context.Provider value={contextValue}>
        <Header />
        <main id='content'>  
          <ProgressBar />   
            <Routes>
              <Route 
                path='/' 
                element={
                  <Basic />
                } 
              />                
              <Route 
                path='/favourites' 
                element={
                  <Favourites 
                    productsFavourites={productsFavourites} 
                    loading={loadingFavourites} 
                  />
                } 
              />                   
              <Route 
                path='/profile' 
                element={
                  <Profile />
                } 
              />                   
              <Route 
                path='/basket' 
                element={
                  <Basket 
                    productsBasket={productsBasket} 
                    loading={loadingBasket} 
                  />
                } 
              />                   
            </Routes>
          <ScrollButton />
          <ChatBtn />
          <Support />
          <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={() => {deleteProductBasket(productIdToDelete)}}
            onCancel={closeModal}
            modalId='modal-basket-delete'
            portalId='confirm-modal-basket-delete'
            title='Удаление товара'
            description='Удалить выбранный товар? Отменить действие будет невозможно.'
          />
          <ConfirmModal
            isOpen={isModalOpenAllBasket}
            onConfirm={() => {handleClearBasket()}}
            onCancel={closeModalAllBasket}
            modalId='modal-basket-delete-all'
            portalId='confirm-modal-basket-delete-all'
            title='Удаление корзины'
            description='Удалить все товары из корзины? Отменить действие будет невозможно.'
          />
          <ConfirmModal
            isOpen={isModalOpenAllFav}
            onConfirm={() => {handleClearFav()}}
            onCancel={closeModalAllFav}
            modalId='modal-fav-delete-all'
            portalId='confirm-modal-fav-delete-all'
            title='Удаление избранного'
            description='Удалить все товары из избранного? Отменить действие будет невозможно.'
          />
        </main>
        <Footer />      
        <CookiesNotice />
      </Context.Provider>
    </>
  )
}

export default App



























