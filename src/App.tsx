import { Routes, Route } from 'react-router-dom'
import { Context } from './contexts/context'
import { useMemo } from 'react'
import  { setCartBasket } from './redux/BasketSlice'
import { CATEGORIES } from './constants/categories'
import { useNotification, useModals, useFavourites, useBasket, useTheme, useProducts, useAuth } from './hooks/index'
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
  useAuth()

  const { notification, setNotification, showNotification } = useNotification()

  const {
    isModalAdvertisementOpen,
    isModalOpen,
    isSupportOpen,
    isModalOpenAllBasket,
    isModalOpenAllFav,
    closeModalAdvertisement,
    OpenModalAdvertisement,
    openSupport,
    closeSupport,
    closeModalAllBasket,
    handleClearBasketBtn,
    showModal,
    closeModal,
    closeModalAllFav,
    handleClearFavBtn,
  } = useModals()

  const {
    cartBasket,
    loadingDeleteAllBasket,
    loadingBasket,
    deletingBasket,
    handleClearBasketProduct,
    handleCountChange,
    decreaseBasket,
    increaseBasket,
    handleClearBasket,
    deleteProductBasket,
    setLoadingBasket,
    updateBasketData,
  } = useBasket()

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

  const {
    cartFavourites,
    loadingFavourites,
    deletingFavourites,
    loadingDeleteAllFav,
    deleteProductFavourites,
    addInBasketProductFavourites,
    setLoadingFavourites,
    handleClearFav,
    updateFavouritesData,
  } = useFavourites()

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

  useTheme()

  const {
    searchQuery,
    isLoading,
    cards,
    currentPage,
    currentSort,
    totalItems,
    filters,
    selectedCategory,
    sortType,
    setSelectedCategory,
    setCurrentPage,
    setSearchQuery,
    setSortType,
    handleFiltersChange,
    setCurrentSort,
    fetchCards,
    setCards,
    setSearchParams,
  } = useProducts()

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



































