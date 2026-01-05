import { Routes, Route } from 'react-router-dom'
import { useTheme, useAuth } from './shared/hooks/index'
import { UIProvider, useUIContextModals, useUIContextNotification } from './shared/contexts/UIContext'
import { ProductsProvider } from './features/layout/products/contexts/ProductsContext'
import { FavouritesProvider, useFavouritesContext } from './features/favourites/contexts/FavouritesContext'
import { BasketProvider, useBasketContext } from './features/basket/contexts/BasketContext'
import Header from './features/layout/header/components/Header'
import Footer from './features/layout/footer/components/Footer'
import ProgressBar from './features/layout/header/components/headerComponents/ProgressBar'
import ButtonScroll from './shared/ui/buttons/ButtonScroll'
import ButtonChat from './shared/ui/buttons/ButtonChat'
import CookiesNotice from './shared/widgets/cookiesNotice/CookiesNotice'
import Main from './features/layout/products/components/Main'
import Favourites from './features/favourites/components/Favourites'
import Profile from './features/profile/components/Profile'
import Basket from './features/basket/components/Basket'
import Support from './shared/widgets/support/Support'
import Notification from './shared/widgets/Notification'
import ModalContainer from './shared/widgets/modals/ModalContainer'
import FavouritesList from './features/favourites/components/favouritesComponents/FavouritesList'
import BasketList from './features/basket/components/basketComponents/BasketList'
import Backdrop from './shared/ui/backdrop/Backdrop'

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
    isCategoriesProductOpen,
    isFiltersProductOpen,
    isSearchProductOpen
  } = useUIContextModals()

  const { notification, setNotification, } = useUIContextNotification()
  const { loadingFavourites, handleClearFav } = useFavouritesContext()
  const { loadingBasket, handleClearBasket, deleteProductBasket } = useBasketContext()

  const shouldShowBackdrop = isCategoriesProductOpen || isFiltersProductOpen || isSearchProductOpen

  return (
    <>
      <Header />
      <main id='main' className='main'>  
        <Routes>
          <Route path='/' element={<Main />} />                
          <Route 
            path='/favourites' 
            element={<Favourites loading={loadingFavourites}><FavouritesList /></Favourites>} 
          />                   
          <Route path='/profile' element={<Profile />} />                   
          <Route 
            path='/basket' 
            element={<Basket loading={loadingBasket}><BasketList /></Basket>} 
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
      <Backdrop isActive={shouldShowBackdrop} />
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



































