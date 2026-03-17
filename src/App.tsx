import { Routes, Route } from 'react-router-dom'
import { useTheme } from './features/layout/header/components/themeToggle/useTheme'
import { useAuth } from './features/profile/hooks/useAuth'
import { useFavourites } from './features/favourites/hooks/useFavourites'
import { useBasket } from './features/basket/hooks/useBasket'
import { useUIContextModals, useUIContextNotification } from './shared/providers/UIProvider'
import { Spinner } from './shared/ui/spinner/Spinner'
import { lazy, Suspense } from 'react'
import Header from './features/layout/header/Header'
import Footer from './features/layout/footer/Footer'
import ProgressBar from './features/layout/header/components/progressBar/ProgressBar'
import ButtonScroll from './shared/ui/buttons/ButtonScroll'
import ButtonChat from './shared/ui/buttons/ButtonChat'
import CookiesNotice from './shared/widgets/cookiesNotice/CookiesNotice'
import Support from './shared/widgets/support/Support'
import Notification from './shared/widgets/notification/Notification'
import ModalContainer from './shared/widgets/modals/ModalContainer'
import Backdrop from './shared/ui/backdrop/Backdrop'
const Products = lazy(() => import('./features/layout/products/Products'))
const Profile = lazy(() => import('./features/profile/Profile'))
const AdminPanel = lazy(() => import('./features/admin/AdminPanel'))
const Favourites = lazy(() => import('./features/favourites/Favourites'))
const FavouritesList = lazy(() => import('./features/favourites/components/FavouritesList'))
const Basket = lazy(() => import('./features/basket/Basket'))
const BasketList = lazy(() => import('./features/basket/components/BasketList'))

const App = () => {
  useTheme()
  const { isMeLoading, handleDeleteAccount, isDeletingAccount } = useAuth()

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
    isSearchProductOpen,
    isDeleteAccountModalOpen,
    isEditProfileModalOpen,
    closeEditProfileModal
  } = useUIContextModals()

  const { notification, setNotification, } = useUIContextNotification()
  const { loadingFavourites, handleClearFav } = useFavourites()
  const { loadingBasket, handleClearBasket, deleteProductBasket } = useBasket()

  const shouldShowBackdrop = isCategoriesProductOpen || isFiltersProductOpen || isSearchProductOpen 
  
  if (isMeLoading) return <Spinner />

  return (
    <>
      <Header />
      <main id='main' className='main'>  
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<Products />} />                
            <Route path='/profile' element={<Profile />} />                   
            <Route path='/admin' element={<AdminPanel />} />               
            <Route 
              path='/favourites' 
              element={<Favourites loading={loadingFavourites}><FavouritesList /></Favourites>} 
            />                   
            <Route path='/basket' element={<Basket loading={loadingBasket}><BasketList /></Basket>} />    
          </Routes>
        </Suspense>
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
        isDeleteAccountModalOpen={isDeleteAccountModalOpen}
        confirmDeleteAccount={handleDeleteAccount}
        isEditProfileModalOpen={isEditProfileModalOpen}
        closeEditProfileModal={closeEditProfileModal}
        isDeletingAccount={isDeletingAccount}
      />
      <Backdrop isActive={shouldShowBackdrop} />
      <CookiesNotice />
      <Footer />      
    </>
  )
}

export default App































