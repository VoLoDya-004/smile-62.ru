import { Routes, Route } from 'react-router-dom'
import { useTheme, useAuth } from './hooks/index'
import { UIProvider, useUIContextModals, useUIContextNotification } from './contexts/UIContext'
import { ProductsProvider } from './contexts/ProductsContext'
import { FavouritesProvider, useFavouritesContext } from './contexts/FavouritesContext'
import { BasketProvider, useBasketContext } from './contexts/BasketContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProgressBar from './components/sub-components/ProgressBar'
import ButtonScroll from './components/Button/ButtonScroll'
import ButtonChat from './components/Button/ButtonChat'
import CookiesNotice from './components/sub-components/CookiesNotice'
import Main from './components/Main/Main'
import Favourites from './components/Favourites/Favourites'
import Profile from './components/Profile/Profile'
import Basket from './components/Basket/Basket'
import Support from './components/sub-components/Support'
import Notification from './components/sub-components/Notification'
import ModalContainer from './components/Modals/ModalContainer'
import FavouritesList from './components/Favourites/FavouritesList'
import BasketList from './components/Basket/BasketList'

const AppContent = () => {
  const {
    openSupport,
    isSupportOpen,
    closeSupport,
    isModalAdvertisementOpen,
    isModalOpen,
    isModalOpenAllBasket,
    isModalOpenAllFav,
    closeModalAdvertisement,
    closeModal,
    closeModalAllBasket,
    closeModalAllFav,
    productIdToDelete,
  } = useUIContextModals()
  
  const { notification, setNotification, } = useUIContextNotification()
  const { loadingFavourites, handleClearFav } = useFavouritesContext()
  const { loadingBasket, handleClearBasket, deleteProductBasket } = useBasketContext()

  return (
    <>
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
              <Favourites loading={loadingFavourites}>
                <FavouritesList />
              </Favourites>
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
              <Basket loading={loadingBasket}>
                <BasketList />
              </Basket>
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
        handleClearBasketProduct={deleteProductBasket}
        handleClearBasket={handleClearBasket}
        handleClearFav={handleClearFav}
        closeModalAdvertisement={closeModalAdvertisement}
        closeModal={closeModal}
        closeModalAllBasket={closeModalAllBasket}
        closeModalAllFav={closeModalAllFav}
        productIdToDelete={productIdToDelete}
      />
      <CookiesNotice />
      <Footer />      
    </>
  )
}

const App = () => {
  useAuth()
  useTheme()

  return (
    <UIProvider>
      <ProductsProvider>
        <FavouritesProvider>
          <BasketProvider>
            <AppContent />
          </BasketProvider>
        </FavouritesProvider>
      </ProductsProvider>
    </UIProvider>
  )
}

export default App



































