import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Context } from './JS/context'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  {setCartBasket} from './redux/BasketSlice'
import { setIsDarkTheme } from './redux/ThemeSlice'
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Basic from './components/Basic/Basic'
import Favourites from './components/Favourites/Favourites'
import Profile from './components/Profile/Profile'
import Basket from './components/Basket/Basket'
import ProgressBar from './components/sub-components/ProgressBar'
import ScrollButton from './components/sub-components/ScrollButton'
import ChatBtn from './components/sub-components/ChatBtn'
import BasketProducts from './components/Basket/BasketComponents/BasketProducts'
import FavouritesProducts from './components/Favourites/FavouritesComponents/FavouritesProducts'
import Support from './components/sub-components/Support'
import CookiesNotice from './components/sub-components/CookiesNotice'
import ConfirmModalBasket from './components/sub-components/ConfirmModalBasket'
import ConfirmModalAllBasket from './components/sub-components/ConfirmModalAllBasket'
import ConfirmModalAllFav from './components/sub-components/ConfirmModalAllFav'


export default function App() {
//работа с корзиной
  const srcBasket = "http://localhost:3000/src/PHP/basket.php?idUser=222&Operation=showBasket"

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const [isPendingDelete, setIsPendingDelete] = useState({})

  const [isModalOpenAllBasket, setIsModalOpenAllBasket] = useState(false)
  const [isModalOpenAllFav, setIsModalOpenAllFav] = useState(false)
  const [loadingDeleteAllBasket, setLoadingDeleteAllBasket] = useState(false)
  const [loadingDeleteAllFav, setLoadingDeleteAllFav] = useState(false)
  const [loadingFavourites, setLoadingFavourites] = useState(true)
  const [loadingBasket, setLoadingBasket] = useState(true)

  const dispatch = useDispatch()
  const cartBasket = useSelector((state) => state.basket.cartBasket)

  const deleteProductBasket = useCallback((idToDelete) => {
    if (idToDelete) {
      setIsModalOpen(false)
      setIsPendingDelete(prev => ({ ...prev, [idToDelete]: true }))
      axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${idToDelete}&Operation=deleteBasket`)
        .then(() => {
          // После успешного удаления обновляем корзину
          return axios.get(srcBasket)
        })
        .then((res) => {
          dispatch(setCartBasket(res.data))
          setIsPendingDelete(prev => ({ ...prev, [idToDelete]: false }))
        })
        .catch((error) => {
          setIsPendingDelete(prev => ({ ...prev, [idToDelete]: false }))
          console.error("Ошибка при удалении продукта:", error)
        })
    }
  }, [dispatch, productIdToDelete, srcBasket])

  const handleClearBasket = useCallback(() => {
    setIsModalOpenAllBasket(false)
    setLoadingDeleteAllBasket(true)
    axios.get("http://localhost:3000/src/PHP/basket.php?idUser=222&Operation=clearBasket")
    .then(() => {
      return axios.get(srcBasket)
    })
    .then((res) => {
      dispatch(setCartBasket(res.data))
      closeModalAllBasket()
      setLoadingDeleteAllBasket(false)
    })
    .catch((error) => {
      console.error("Ошибка при очистке корзины:", error)
      closeModalAllBasket()
      setLoadingDeleteAllBasket(false)
    })
  }, [dispatch])

  const showModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(true)
  }, [setIsModalOpenAllBasket])

  const closeModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(false)
  }, [setIsModalOpenAllBasket])

  const handleClearBasketBtn = useCallback(() => {
    showModalAllBasket()
  }, [showModalAllBasket])

  const showModal = useCallback((id) => {
    setProductIdToDelete(id)
    setIsModalOpen(true)
  }, [setIsModalOpen, setProductIdToDelete, setIsPendingDelete])

  const closeModal = useCallback((id) => {
    setIsModalOpen(false)
    setProductIdToDelete(id)
  }, [setIsModalOpen, setProductIdToDelete])

  const increaseBasket = useCallback((id, currentCount) => {
    if (currentCount >= 100) return
    axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${id}&Operation=increaseBasket`)
    .then(() => {
      // После успешного увеличения обновляем корзину
      return axios.get(srcBasket)
    })
    .then((res) => {
      dispatch(setCartBasket(res.data))
      })
    .catch((error) => {
      console.error("Ошибка при увеличении корзины:", error)
    })
  }, [dispatch, srcBasket])

  const decreaseBasket = useCallback((id, currentCount) => {
    if (currentCount <= 1) return
    axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${id}&Operation=decreaseBasket`)
    .then(() => {
      // После успешного уменьшения обновляем корзину
      return axios.get(srcBasket)
    })
    .then((res) => {
      dispatch(setCartBasket(res.data))
    })
    .catch((error) => {
      console.error("Ошибка при уменьшении корзины:", error)
    })
  }, [dispatch, srcBasket])

  const handleCountChange = useCallback((e, id) => {
    let newCount = e.target.value
    if (newCount === "") {
      newCount = 1
    } else {
      newCount = parseInt(newCount, 10)
      if (isNaN(newCount) || newCount < 1) return
      if (newCount > 100) newCount = 100
    }
    axios.get(`http://localhost:3000/src/PHP/basket.php?idProduct=${id}&Operation=updateCount&count=${newCount}`)
      .then(() => {
        // После успешного обновления получаем актуальную корзину
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
      })
      .catch((error) => {
        console.error("Ошибка при обновлении количества:", error)
      })
  }, [dispatch, srcBasket])

  useEffect(() => {
    setLoadingBasket(true)
    axios.get(srcBasket).then((res) => {
      dispatch(setCartBasket(res.data))
    })
    .catch((error) => {
      console.error("Ошибка при загрузке корзины:", error)
    })
    .finally(() => {
      setLoadingBasket(false)
    })
  }, [dispatch])

  const productsBasket = useMemo(() => {
  return cartBasket.map((productBasket) => {
    return (
      <BasketProducts 
        productBasket = {productBasket} key = {productBasket.id} 
        deleteProductBasket = {() => showModal(productBasket.id)} increaseBasket = {increaseBasket} 
        decreaseBasket = {decreaseBasket} onChange={handleCountChange} value={productBasket.count}
        isPendingDelete={isPendingDelete[productBasket.id]}
      />
    )
  })
  }, [cartBasket, deleteProductBasket, increaseBasket, decreaseBasket, handleCountChange, showModal])

  // обновление кружка корзины без обновления страницы
useEffect(() => {
  const handleClick = () => {
    axios.get("http://localhost:3000/src/PHP/basket.php?idUser=222&Operation=showBasket")
      .then(() => {
        return axios.get(srcBasket)
      })
      .then((res) => {
        dispatch(setCartBasket(res.data))
      })
      .catch((error) => {
        console.error("Ошибка при обновлении кружка корзины:", error)
      })
  }

  // Навешиваем один раз
  document.body.addEventListener('click', handleClick)

  // Очистка
  return () => {
    document.body.removeEventListener('click', handleClick)
  }
}, [dispatch])
//


//работа с избранными товарами
  const srcFavourites = "http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showFavourites"

  const [cartFavourites, setCartFavourites] = useState([])

  const deleteProductFavourites = useCallback((id) => {
  axios.get(`http://localhost:3000/src/PHP/favourites.php?idProduct=${id}&Operation=deleteFavourites`)
    .then(() => {
      // После успешного удаления обновляем состояние
      setCartFavourites(prevFavourites => prevFavourites.filter(item => item.id !== id))
    })
    .catch((error) => {
      console.error("Ошибка при удалении продукта:", error)
    })
  }, [setCartFavourites])

  const handleClearFav = useCallback(() => {
    setIsModalOpenAllFav(false)
    setLoadingDeleteAllFav(true)
    axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=clearFavourites")
    .then(() => {
      return axios.get(srcFavourites)
    })
    .then((res) => {
        setCartFavourites(res.data)
        closeModalAllFav()
        setLoadingDeleteAllFav(false)
    })
    .catch((error) => {
      console.error("Ошибка при очистке избранных:", error)
      setLoadingDeleteAllFav(false)
      closeModalAllFav()
    })
  }, [setCartFavourites])

  const showModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(true)
  }, [setIsModalOpenAllFav])

  const closeModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(false)
  }, [setIsModalOpenAllFav])

  const handleClearFavBtn = useCallback(() => {
    showModalAllFav()
  }, [showModalAllFav])

  const addInBasketProductFavourites = useCallback((id) => {
  axios.get(`http://localhost:3000/src/PHP/favourites.php?idProduct=${id}&idUser=222&Operation=addBasket`)
    .then(() => {
      // После успешного добавления обновляем избранное
      return axios.get(srcFavourites)
    })
    .then((res) => {
      setCartFavourites(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при удалении продукта:", error)
    })
  }, [setCartFavourites])

  useEffect(() => {
    setLoadingFavourites(true)
    axios.get(srcFavourites).then((res) => {
      setCartFavourites(res.data)
    })
    .catch((error) => {
      console.error("Ошибка при загрузке избранных:", error)
    })
    .finally(() => {
      setLoadingFavourites(false)
    })
  }, [])

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
//

// обновление избранных товаров без обновления страницы
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll(".card__heart") // Перепроверяем наличие кнопок

      if (buttons.length > 0) {
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showFavourites")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcFavourites)
            })
            .then((res) => {
              setCartFavourites(res.data)
            })
            .catch((error) => {
              console.error("Ошибка при обновлении избранных:", error)
            })
          })
        })
        //observer.disconnect() // Прекращаем наблюдение, если кнопки найдены
      }
    })

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, { // Наблюдаем за всем body (или родительским элементом, где находятся кнопки)
        childList: true, // Отслеживаем добавление/удаление дочерних элементов
        subtree: true // Отслеживаем изменения во всех поддеревьях
    })
    //Функция очистки (отключение observer)
    return () => {
      observer.disconnect()
      const buttons = document.querySelectorAll(".card__heart") // Находим кнопки снова
      buttons.forEach(button => {
        button.removeEventListener('click', () => { 
          axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showFavourites")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcFavourites)
            })
            .then((res) => {
              setCartFavourites(res.data)
            })
            .catch((error) => {
              console.error("Ошибка при обновлении избранных:", error)
            }) 
        })
      })
    }
  }, [])
//

// обновление корзины товаров из избранных без обновления страницы
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll(".basketBox__product_controls") // Перепроверяем наличие кнопок

      if (buttons.length > 0) {
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showBasket")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcBasket)
            })
            .then((res) => {
              dispatch(setCartBasket(res.data))
            })
            .catch((error) => {
              console.error("Ошибка при обновлении избранных:", error)
            })
          })
        })
        //observer.disconnect() // Прекращаем наблюдение, если кнопки найдены
      }
    })

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, { // Наблюдаем за всем body (или родительским элементом, где находятся кнопки)
        childList: true, // Отслеживаем добавление/удаление дочерних элементов
        subtree: true // Отслеживаем изменения во всех поддеревьях
    })
    //Функция очистки (отключение observer)
    return () => {
      observer.disconnect()
      const buttons = document.querySelectorAll(".basketBox__product_controls") // Находим кнопки снова
      buttons.forEach(button => {
        button.removeEventListener('click', () => { 
          axios.get("http://localhost:3000/src/PHP/favourites.php?idUser=222&Operation=showBasket")
            .then(() => {
              // После успеха обновляем корзину
              return axios.get(srcBasket)
            })
            .then((res) => {
              dispatch(setCartBasket(res.data))
            })
            .catch((error) => {
              console.error("Ошибка при обновлении избранных:", error)
            }) 
        })
      })
    }
  }, [dispatch])

  //поиск
  const[searchQuery, setSearchQuery] = useState('')

  //пагинация
  const [currentPage, setCurrentPage] = useState(1);

  //меню товаров
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
      { id: 0, label: "Все категории" },
      { id: 2, label: "Смартфоны" },
      { id: 4, label: "Телевизоры" },
      { id: 5, label: "Компьютеры" },
      { id: 6, label: "Красота и здоровье" },
      { id: 7, label: "Техника для кухни" },
      { id: 8, label: "Аудиотехника" },
      { id: 9, label: "Фото и видео" },
      { id: 10, label: "Аксессуары" },
      { id: 11, label: "Сад и огород" },
      { id: 12, label: "Офис" },
      { id: 13, label: "Умные устройства" },
      { id: 14, label: "Автотовары" },
      { id: 15, label: "Сетевое оборудование" },
      { id: 3, label: "Планшеты" },
      { id: 1, label: "Ноутбуки" },
      { id: 16, label: "Кабели и адаптеры" },
      { id: 17, label: "Электронные книги" },
      { id: 18, label: "Климатическая техника" },
      { id: 19, label: "Техника для творчества" },
      { id: 20, label: "Отдых и развлечения" },
      { id: 21, label: "VR-гарнитуры" },
      { id: 22, label: "Устройства для безопасности" },
      { id: 23, label: "Техника для ремонта" },
      { id: 24, label: "Техника для дома" },
  ]

  // карточки на главной
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // сортировка товаров
  const [sortType, setSortType] = useState("default")
  const [activeCategoryId, setActiveCategoryId] = useState(0)

  // фильтры
  const [currentSort, setCurrentSort] = useState("по умолчанию")
  const [filters, setFilters] = useState({
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
  })

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  //загрузка карточек со всеми параметрами
  const [totalItems, setTotalItems] = useState(0)

  const fetchCards = useCallback(async () => {
  setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/src/PHP/getCards.php`, {
        params: {
          page: currentPage,
          search: searchQuery,
          idCategory: selectedCategory,
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
    } catch (error) {
      console.error('Ошибка при загрузке карточек:', error)
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

  
  return (
    <>
    <Router>
      <Context.Provider value={{setSelectedCategory, setCurrentPage, categories,
        activeCategoryId, setActiveCategoryId
      }}>
        <Header onSearchChange={setSearchQuery} />
      </Context.Provider>

      <main id='content'>  
        <ProgressBar />   
          <Routes>
            <Route path='/' 
              element={
                <Context.Provider value={{cartFavourites, cartBasket, searchQuery, selectedCategory, 
                cards, setCards, setSortType, sortType, handleFiltersChange, filters,
                setSelectedCategory, setSearchQuery, setCurrentPage, isLoading, currentPage,
                currentSort, setCurrentSort, activeCategoryId, categories, fetchCards,
                setActiveCategoryId, totalItems}}>
                  <Basic />
                </Context.Provider>
              } />                
            <Route path='/favourites' 
              element={
                <Context.Provider value={{handleClearFavBtn, loadingDeleteAllFav}}>
                  <Favourites productsFavourites={productsFavourites} loading={loadingFavourites}  />
                </Context.Provider>
              } />                   
            <Route path='/profile' 
              element={
                  <Profile />
              } />                   
            <Route path='/basket' 
              element={
                <Context.Provider value={{handleClearBasketBtn, loadingDeleteAllBasket}}>
                  <Basket productsBasket={productsBasket} loading={loadingBasket} />
                </Context.Provider>
              } />                   
          </Routes>

        <ScrollButton />
        <ChatBtn />
        <Support />
        <ConfirmModalBasket
          isOpen={isModalOpen}
          onConfirm={() => {deleteProductBasket(productIdToDelete)}}
          onCancel={closeModal}
        />
        <ConfirmModalAllBasket 
          isOpen={isModalOpenAllBasket}
          onConfirm={() => {handleClearBasket()}}
          onCancel={closeModalAllBasket}
        />
        <ConfirmModalAllFav
          isOpen={isModalOpenAllFav}
          onConfirm={() => {handleClearFav()}}
          onCancel={closeModalAllFav}
        />

      </main>
      
      <Footer />
      
      <CookiesNotice />
    </Router>
    </>
  )
}





