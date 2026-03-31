import { useTheme } from './header/components/themeToggle/useTheme'
import { useAuth } from '@/features/profile/hooks/useAuth'
import { useFavourites } from '@/features/favourites/hooks/useFavourites'
import { useBasket } from '@/features/basket/hooks/useBasket'
import { useUIContextModals, useUIContextNotification } from '@/shared/providers/UIProvider'
import { Spinner } from '@/shared/ui/spinner/Spinner'
import Header from './header/Header'
import Footer from './footer/Footer'
import ProgressBar from './header/components/progressBar/ProgressBar'
import ButtonScroll from '../ui/buttons/ButtonScroll'
import ButtonChat from '../ui/buttons/ButtonChat'
import CookiesNotice from '../widgets/cookiesNotice/CookiesNotice'
import Support from '../widgets/support/Support'
import Notification from '../widgets/notification/Notification'
import ModalContainer from '../widgets/modals/ModalContainer'
import Backdrop from '../ui/backdrop/Backdrop'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
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

  const { notification, setNotification } = useUIContextNotification()
  const { handleClearFav } = useFavourites()
  const { handleClearBasket, deleteProductBasket } = useBasket()

  const shouldShowBackdrop = isCategoriesProductOpen || isFiltersProductOpen || isSearchProductOpen

  if (isMeLoading) return <Spinner />

  return (
    <>
      <Header />
      <main id='main' className='main'>
        {children}
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