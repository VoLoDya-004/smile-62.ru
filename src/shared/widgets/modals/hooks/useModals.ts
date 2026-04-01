import { useBodyScrollLock } from '@/shared/hooks'
import { useCallback, useState } from 'react'

export const useModals = () => {
  const [isModalAdvertisementOpen, setIsModalAdvertisementOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isModalOpenAllBasket, setIsModalOpenAllBasket] = useState(false)
  const [isModalOpenAllFav, setIsModalOpenAllFav] = useState(false)
  const [isCategoriesProductOpen, setIsCategoriesProductOpen] = useState(false)
  const [isFiltersProductOpen, setIsFiltersProductOpen] = useState(false)
  const [isSearchProductOpen, setIsSearchProductOpen] = useState(false)
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)

  const isAnyModalOpen = 
    isModalAdvertisementOpen ||
    isModalOpen ||
    isSupportOpen ||
    isModalOpenAllBasket ||
    isModalOpenAllFav ||
    isCategoriesProductOpen ||
    isFiltersProductOpen ||
    isSearchProductOpen ||
    isDeleteAccountModalOpen ||
    isEditProfileModalOpen

  useBodyScrollLock(isAnyModalOpen)

  const openEditProfileModal = useCallback(() => {
    setIsEditProfileModalOpen(true)
  }, [])

  const closeEditProfileModal = useCallback(() => {
    setIsEditProfileModalOpen(false)
  }, [])

  const openSupport = useCallback(() => {
    setIsSupportOpen(true)
  }, [])

  const OpenModalAdvertisement = () => {
    setIsModalAdvertisementOpen(true)
  }

  const showModal = useCallback((id: number) => {
    setProductIdToDelete(id)
    setIsModalOpen(true)
  }, [setIsModalOpen, setProductIdToDelete])

  const showModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(true)
  }, [])

  const showModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(true)
  }, [setIsModalOpenAllFav])

  const closeSupport = useCallback(() => {
    setIsSupportOpen(false)
  }, [])

  const closeModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(false)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [setIsModalOpen, setProductIdToDelete])

  const closeModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(false)
  }, [setIsModalOpenAllFav])

  const closeModalAdvertisement = () => {
    setIsModalAdvertisementOpen(false)
  }

  const handleClearBasketBtn = useCallback(() => {
    showModalAllBasket()
  }, [showModalAllBasket])

  const handleClearFavBtn = useCallback(() => {
    showModalAllFav()
  }, [showModalAllFav])

  const openDeleteAccountModal = useCallback(() => {
    setIsDeleteAccountModalOpen(true)
  }, [setIsDeleteAccountModalOpen])

  const closeDeleteAccountModal = useCallback(() => {
    setIsDeleteAccountModalOpen(false)
  }, [setIsDeleteAccountModalOpen])

  return {
    isModalAdvertisementOpen,
    isModalOpen,
    isSupportOpen,
    isModalOpenAllBasket,
    isModalOpenAllFav,
    productIdToDelete,
    closeModalAdvertisement,
    closeSupport,
    closeModalAllBasket,
    closeModal,
    closeModalAllFav,
    OpenModalAdvertisement,
    openSupport,
    showModal,
    setIsModalOpen,
    setIsModalOpenAllBasket,
    setIsModalOpenAllFav,
    handleClearFavBtn,
    handleClearBasketBtn,
    isCategoriesProductOpen, 
    setIsCategoriesProductOpen,
    isFiltersProductOpen, 
    setIsFiltersProductOpen,
    isSearchProductOpen, 
    setIsSearchProductOpen,
    isDeleteAccountModalOpen,
    closeDeleteAccountModal,
    openDeleteAccountModal,
    isEditProfileModalOpen,
    openEditProfileModal,
    closeEditProfileModal
  }
}