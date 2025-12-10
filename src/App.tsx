import { Routes, Route, useSearchParams } from 'react-router-dom'
import { Context } from './contexts/context'
import { useState, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/UserSlice'
import  { setCartBasket } from './redux/BasketSlice'
import { setIsDarkTheme } from './redux/ThemeSlice'
import { setCartFavourites } from './redux/FavouritesSlice'
import type { RootStore } from './redux'
import type { IFilters, ICardsRender, INotificationData } from './types/types' 
import { CATEGORIES } from './constants/categories'
import { API_URLS } from './constants/urls'
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProgressBar from './components/sub-components/ProgressBar'
import ButtonScroll from './components/Button/ButtonScroll'
import ButtonChat from './components/Button/ButtonChat'
import BasketProducts from './components/Basket/BasketComponents/BasketTable/BasketProducts'
import FavouritesProducts from './components/Favourites/FavouritesComponents/FavouritesTable/FavouritesProducts'
import CookiesNotice from './components/sub-components/CookiesNotice'
import Main from './components/Main/Main'
import Favourites from './components/Favourites/Favourites'
import Profile from './components/Profile/Profile'
import Basket from './components/Basket/Basket'
import Support from './components/sub-components/Support'
import Notification from './components/sub-components/Notification'
import ModalContainer from './components/Modals/ModalContainer'

const App = () => {
  const dispatch = useDispatch()
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

  // Модалки и уведомления

  const [isModalAdvertisementOpen, setIsModalAdvertisementOpen] = useState(false)

  const closeModalAdvertisement = () => {
    setIsModalAdvertisementOpen(false)
    document.body.classList.remove('modal-open')
  }

  const OpenModalAdvertisement = () => {
    setIsModalAdvertisementOpen(true)
    document.body.classList.add('modal-open')
  }

  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isModalOpenAllBasket, setIsModalOpenAllBasket] = useState(false)
  const [isModalOpenAllFav, setIsModalOpenAllFav] = useState(false)

  const openSupport = useCallback(() => setIsSupportOpen(true), [])
  const closeSupport = useCallback(() => setIsSupportOpen(false), [])

  const showModalAllBasket = useCallback(() => setIsModalOpenAllBasket(true), [])
  const closeModalAllBasket = useCallback(() => setIsModalOpenAllBasket(false), [])
  const handleClearBasketBtn = useCallback(() => showModalAllBasket(), [showModalAllBasket])
  const handleClearBasketProduct = useCallback(() => {
    deleteProductBasket(productIdToDelete)
  }, [productIdToDelete])

  const showModal = useCallback((id: number) => {
    setProductIdToDelete(id)
    setIsModalOpen(true)
  }, [setIsModalOpen, setProductIdToDelete])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [setIsModalOpen, setProductIdToDelete])

  const showModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(true)
  }, [setIsModalOpenAllFav])

  const closeModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(false)
  }, [setIsModalOpenAllFav])

  const handleClearFavBtn = useCallback(() => {
    showModalAllFav()
  }, [showModalAllFav])

  const [notification, setNotification] = useState<INotificationData | null>(null)

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type })
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  //работа с корзиной

  const srcBasket = `${API_URLS.BASKET}?idUser=${userId}&Operation=showBasket`

  const [loadingDeleteAllBasket, setLoadingDeleteAllBasket] = useState(false)
  const [loadingDeleteAllFav, setLoadingDeleteAllFav] = useState(false)
  const [loadingFavourites, setLoadingFavourites] = useState(true)
  const [loadingBasket, setLoadingBasket] = useState(true)

  const cartBasket = useSelector((state: RootStore) => state.basket.cartBasket)

  const [deletingBasket, setDeletingBasket] = useState<Set<number>>(new Set())

  const deleteProductBasket = useCallback((id: number | null) => {
    if (id && userId !== null) {
      setIsModalOpen(false)
      setDeletingBasket(prev => new Set(prev).add(id))

      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'deleteBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => {
        setDeletingBasket(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      })
    }
  }, [dispatch, userId, srcBasket])

  const handleClearBasket = useCallback(() => {
    if (userId !== null) {
      setIsModalOpenAllBasket(false)
      setLoadingDeleteAllBasket(true)
      
      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'clearBasket',
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => setLoadingDeleteAllBasket(false))
    }
  }, [dispatch, userId])

  const increaseBasket = useCallback((id: number, currentCount: number) => {
    if (userId !== null) {
      if (currentCount >= 100) return
      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'increaseBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
    }
  }, [dispatch, srcBasket])

  const decreaseBasket = useCallback((id: number, currentCount: number) => {
    if (userId !== null) {
      if (currentCount <= 1) return
      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'decreaseBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
    }
  }, [dispatch, srcBasket])

  const handleCountChange = useCallback((e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (userId !== null) {
      let newCount = e.target.value
      if (newCount === '') {
        newCount = '1'
      }
      if (Number(newCount) > 100) {
        newCount = '100'
      }

      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'updateCount',
          idProduct: id,
          count: newCount,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
    }
  }, [dispatch, srcBasket])

  useEffect(() => {
    if (userId !== null) {
      setLoadingBasket(true)
      axios.get(srcBasket)
      .then((res) => dispatch(setCartBasket(res.data)))
      .finally(() => setLoadingBasket(false))
    } else {
      setLoadingBasket(false)
      dispatch(setCartBasket([]))
    }
  }, [userId])

  const productsBasket = useMemo(() => {
    return cartBasket.map((productBasket) => (
      <BasketProducts 
        productBasket={productBasket} 
        key={productBasket.id} 
        openDeleteModal={() => showModal(productBasket.id)} 
        onChange={handleCountChange}
        isDeleting={deletingBasket.has(productBasket.id)}
      />
    ))}, [
      cartBasket, 
      deleteProductBasket, 
      increaseBasket, 
      decreaseBasket, 
      handleCountChange, 
      showModal,
      deletingBasket
  ])

  //работа с избранными товарами

  const srcFavourites = `${API_URLS.FAVOURITES}?idUser=${userId}&Operation=showFavourites`

  const cartFavourites = useSelector((state: RootStore) => state.favourites.cartFavourites)

  const [deletingFavourites, setDeletingFavourites] = useState<Set<number>>(new Set())

  const deleteProductFavourites = useCallback((id: number) => {
    if (userId !== null) {
      setDeletingFavourites(prev => new Set(prev).add(id))

      axios.get(API_URLS.FAVOURITES, {
        params: {
          Operation: 'deleteFavourites',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcFavourites))
      .then((res) => dispatch(setCartFavourites(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => {
        setDeletingFavourites(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      })
    }
  }, [dispatch, userId])

  const handleClearFav = useCallback(() => {
    if (userId !== null) {
      setIsModalOpenAllFav(false)
      setLoadingDeleteAllFav(true)

      axios.get(API_URLS.FAVOURITES, {
        params: {
          Operation: 'clearFavourites',
          idUser: userId,
        }
      })
      .then(() => axios.get(srcFavourites))
      .then((res) => dispatch(setCartFavourites(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => {
        setLoadingDeleteAllFav(false)
        closeModalAllFav()
      })
    }
  }, [dispatch, userId])

  const addInBasketProductFavourites = useCallback(async (id: number): Promise<void> => {
    if (userId !== null) {
      await axios.get(API_URLS.FAVOURITES, {
        params: {
          Operation: 'addBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      const res = await axios.get(srcFavourites)
      dispatch(setCartFavourites(res.data))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (userId !== null) {
      setLoadingFavourites(true)
      axios.get(srcFavourites)
      .then((res) => dispatch(setCartFavourites(res.data)))
      .finally(() => setLoadingFavourites(false))
    } else {
      setLoadingFavourites(false)
      dispatch(setCartFavourites([]))
    }
  }, [userId])

  const productsFavourites = useMemo(() => {
    return cartFavourites.map((productFavourites) => (
      <FavouritesProducts 
        productFavourites={productFavourites} 
        key={productFavourites.id} 
        deleteProductFavourites={deleteProductFavourites}
        addInBasketProductFavourites={addInBasketProductFavourites}
        cartBasket={cartBasket} 
        cartFavourites={cartFavourites}
        isDeleting={deletingFavourites.has(productFavourites.id)}
      />
    ))
  }, [
      cartFavourites, 
      deleteProductFavourites, 
      addInBasketProductFavourites, 
      cartBasket,
      deletingFavourites
  ])

  // обновление избранных товаров без обновления страницы

  const updateFavouritesData = useCallback(async () => {
    if (!userId) return
    
    await axios.get(API_URLS.FAVOURITES, {
      params: { 
        Operation: 'showBasket', 
        idUser: userId,
      }
    })
    const res = await axios.get(srcFavourites)
    dispatch(setCartFavourites(res.data))
  }, [userId, srcFavourites, dispatch])
    
  // обновление корзины товаров из избранных без обновления страницы

  const updateBasketData = useCallback(async () => {
    if (!userId) return
      
    await axios.get(API_URLS.FAVOURITES, {
      params: { 
        Operation: 'showBasket', 
        idUser: userId,
      }
    })
    const res = await axios.get(srcBasket)
    dispatch(setCartBasket(res.data))
  }, [userId, srcBasket, dispatch])

  //поиск

  const [searchQuery, setSearchQuery] = useState(() => 
    sessionStorage.getItem('searchQuery') || ''
  )

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

  const [selectedCategory, setSelectedCategory] = useState<number | null>(() => 
    Number(searchParams.get('category')) || 0
  )

  // карточки на главной

  const [cards, setCards] = useState<ICardsRender[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // сортировка товаров

  const [sortType, setSortType] = useState(() => 
    searchParams.get('sort') || 'default'
  )

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
    const categoryId = Number(searchParams.get('category')) || 0
    setSelectedCategory(categoryId)
    const sortFromUrl = searchParams.get('sort') || 'default'
    setSortType(sortFromUrl)

    switch (sortFromUrl) {
      case 'cheap':
        setCurrentSort('Дешевле')
        break
      case 'expensive':
        setCurrentSort('Дороже')
        break
      case 'discount':
        setCurrentSort('По скидке (%)')
        break
      default: 
        setCurrentSort('По умолчанию')
    }
  }, [searchParams])

  const [totalItems, setTotalItems] = useState(0)

  const fetchCards = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(API_URLS.CARDS, {
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
        }
      })
      setCards(response.data.items)
      setTotalItems(response.data.total)
    }
    catch {
      showNotification('Ошибка', 'error')
    }
    finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery, selectedCategory, sortType, filters])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  //Инициализация темы при запуске приложения

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    dispatch(setIsDarkTheme(theme === 'dark-theme'))
  }, [dispatch])

  useEffect(() => {
    const themeColor = isDarkTheme ? '#121212' : '#ffffff'
    const statusBarStyle = isDarkTheme ? 'black-translucent' : 'default'
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor)
    } else {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      metaThemeColor.setAttribute('content', themeColor)
      document.head.appendChild(metaThemeColor)
    }
    
    let metaApple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')

    if (metaApple) {
      metaApple.setAttribute('content', statusBarStyle)
    } else {
      metaApple = document.createElement('meta')
      metaApple.setAttribute('name', 'apple-mobile-web-app-status-bar-style')
      metaApple.setAttribute('content', statusBarStyle)
      document.head.appendChild(metaApple)
    } 
  }, [isDarkTheme])

  // мемоизация данных из контекста

  const contextValue = useMemo(
    () => ({
      productsFavourites,
      setSelectedCategory,
      setCurrentPage,
      CATEGORIES,
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
      setCartBasket,
      setSearchParams,
      updateBasketData,
      updateFavouritesData,
      setLoadingBasket,
      setLoadingFavourites,
      OpenModalAdvertisement,
      showNotification
    }), 
    [
      productsFavourites,
      setSelectedCategory,
      setCurrentPage,
      CATEGORIES,
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
      setCartBasket,
      setSearchParams, 
      updateBasketData,
      updateFavouritesData,
      setLoadingBasket,
      setLoadingFavourites,
      OpenModalAdvertisement,
      showNotification
    ]
  )

  return (
    <>
      <Context.Provider value={contextValue}>
        <Header />
        <main id='main'>  
          <Routes>
            <Route 
              path='/' 
              element={
                <Main />
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
        </main>
        {notification && (
          <Notification 
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <ProgressBar /> 
        <ButtonScroll />
        <ButtonChat onOpen={openSupport} />
        <Support isOpen={isSupportOpen} onClose={closeSupport} />
        <ModalContainer 
          isModalAdvertisementOpen={isModalAdvertisementOpen}
          isModalOpen={isModalOpen}
          isModalOpenAllBasket={isModalOpenAllBasket}
          isModalOpenAllFav={isModalOpenAllFav}
          handleClearBasketProduct={handleClearBasketProduct}
          handleClearBasket={handleClearBasket}
          handleClearFav={handleClearFav}
          closeModalAdvertisement={closeModalAdvertisement}
          closeModal={closeModal}
          closeModalAllBasket={closeModalAllBasket}
          closeModalAllFav={closeModalAllFav}
        />
        <CookiesNotice />
        <Footer />      
      </Context.Provider>
    </>
  )
}

export default App



































