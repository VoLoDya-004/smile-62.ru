import { Routes, Route, useSearchParams } from 'react-router-dom'
import { Context } from './contexts/context'
import { useState, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/UserSlice'
import  { setCartBasket } from './redux/BasketSlice'
import { setIsDarkTheme } from './redux/ThemeSlice'
import { setCartFavourites } from './redux/FavouritesSlice'
import type { RootStore } from './redux'
import type { IFilters, ICardsRender } from './types/types' 
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
import ConfirmModal from './components/sub-components/ConfirmModal'


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

  // Модалки

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

  //работа с корзиной

  const srcBasket = `/backend/PHP/basket.php?idUser=${userId}&Operation=showBasket`

  const [loadingDeleteAllBasket, setLoadingDeleteAllBasket] = useState(false)
  const [loadingDeleteAllFav, setLoadingDeleteAllFav] = useState(false)
  const [loadingFavourites, setLoadingFavourites] = useState(true)
  const [loadingBasket, setLoadingBasket] = useState(true)

  const cartBasket = useSelector((state: RootStore) => state.basket.cartBasket)

  const [deletingProductsBasket, setDeletingProductsBasket] = useState<Set<number>>(new Set())

  const deleteProductBasket = useCallback((id: number | null) => {
    if (id && userId !== null) {
      setIsModalOpen(false)
      setDeletingProductsBasket(prev => new Set(prev).add(id))

      axios.get(`/backend/PHP/basket.php`, {
        params: {
          Operation: 'deleteBasket',
          idProduct: id,
          idUser: userId,
        },
      })
      .then(() => axios.get(srcBasket))
      .then((res) => {
        dispatch(setCartBasket(res.data))
      })
      .finally(() => {
        setDeletingProductsBasket(prev => {
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
        setLoadingDeleteAllBasket(false)
      })
      .catch(() => {
        setLoadingDeleteAllBasket(false)
      })
    }
  }, [dispatch, userId])

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
        productBasket = {productBasket} 
        key = {productBasket.id} 
        openDeleteModal = {() => showModal(productBasket.id)} 
        onChange={handleCountChange}
        isDeleting={deletingProductsBasket.has(productBasket.id)}
      />
    )
  })
  }, [
      cartBasket, 
      deleteProductBasket, 
      increaseBasket, 
      decreaseBasket, 
      handleCountChange, 
      showModal,
      deletingProductsBasket
  ])

  //работа с избранными товарами

  const srcFavourites = 
    `/backend/PHP/favourites.php?idUser=${userId}&Operation=showFavourites`

  const cartFavourites = useSelector((state: RootStore) => state.favourites.cartFavourites)

  const [deletingProductsFavourites, setDeletingProductsFavourites] = 
    useState<Set<number>>(new Set())

  const deleteProductFavourites = useCallback((id: number) => {
    if (userId !== null) {
      setDeletingProductsFavourites(prev => new Set(prev).add(id))

      axios.get(`/backend/PHP/favourites.php`, {
        params: {
          Operation: 'deleteFavourites',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => {
        return axios.get(srcFavourites)
      })
      .then((res) => {
        dispatch(setCartFavourites(res.data))
      })
      .finally(() => {
        setDeletingProductsFavourites(prev => {
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
        dispatch(setCartFavourites(res.data))
        closeModalAllFav()
        setLoadingDeleteAllFav(false)
      })
      .catch(() => {
        setLoadingDeleteAllFav(false)
        closeModalAllFav()
      })
    }
  }, [dispatch, userId])

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
    dispatch(setCartFavourites(res.data))
  }, [dispatch, userId])

  useEffect(() => {
    if (userId !== null) {
      setLoadingFavourites(true)
      axios.get(srcFavourites)
        .then((res) => {
          dispatch(setCartFavourites(res.data))
        })
        .finally(() => {
          setLoadingFavourites(false)
        })
    } else {
      setLoadingFavourites(false)
      dispatch(setCartFavourites([]))
    }
  }, [userId])

  const productsFavourites = useMemo(() => {
  return cartFavourites.map((productFavourites) => {
    return (
      <FavouritesProducts 
        productFavourites = {productFavourites} 
        key = {productFavourites.id} 
        deleteProductFavourites = {deleteProductFavourites}
        addInBasketProductFavourites = {addInBasketProductFavourites}
        cartBasket={cartBasket} 
        cartFavourites={cartFavourites}
        isDeleting={deletingProductsFavourites.has(productFavourites.id)}
      />
    )
  })
  }, [
      cartFavourites, 
      deleteProductFavourites, 
      addInBasketProductFavourites, 
      cartBasket,
      deletingProductsFavourites
  ])

  // обновление избранных товаров без обновления страницы

  const updateFavouritesData = useCallback(async () => {
    if (!userId) return
    
    try {
      await axios.get(`/backend/PHP/favourites.php`, {
        params: { Operation: 'showBasket', idUser: userId }
      })
      const res = await axios.get(srcFavourites)
      dispatch(setCartFavourites(res.data))
    } catch (error) { 
      console.error('Ошибка обновления избранного:', error)
    }
  }, [userId, srcFavourites, dispatch])
    
  // обновление корзины товаров из избранных без обновления страницы

  const updateBasketData = useCallback(async () => {
      if (!userId) return
      
      try {
        await axios.get(`/backend/PHP/favourites.php`, {
          params: { Operation: 'showBasket', idUser: userId }
        })
        const res = await axios.get(srcBasket)
        dispatch(setCartBasket(res.data))
      } catch (error) {
        console.error('Ошибка обновления корзины:', error)
      }
  }, [userId, srcBasket, dispatch])

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
    const categoryFromUrl = searchParams.get('category')
    const categoryId = categoryFromUrl ? parseInt(categoryFromUrl) : 0
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

  const contextValue = useMemo(() => ({
    productsFavourites,
    setSelectedCategory,
    setCurrentPage,
    categories,
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
    setLoadingFavourites
  }), [
    productsFavourites,
    setSelectedCategory,
    setCurrentPage,
    categories,
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
    setLoadingFavourites
  ])

  
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
        <ProgressBar /> 
        <ButtonScroll />
        <ButtonChat onOpen={openSupport} />
        <Support isOpen={isSupportOpen} onClose={closeSupport} />
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
        <CookiesNotice />
        <Footer />      
      </Context.Provider>
    </>
  )
}

export default App



































