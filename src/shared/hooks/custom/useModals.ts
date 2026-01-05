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

  const openSupport = useCallback(() => {
    setIsSupportOpen(true)
    document.body.classList.add('modal-open')
  }, [])

  const OpenModalAdvertisement = () => {
    setIsModalAdvertisementOpen(true)
    document.body.classList.add('modal-open')
  }

  const showModal = useCallback((id: number) => {
    setProductIdToDelete(id)
    setIsModalOpen(true)
    document.body.classList.add('modal-open')
  }, [setIsModalOpen, setProductIdToDelete])

  const showModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(true)
    document.body.classList.add('modal-open')
  }, [])

  const showModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(true)
    document.body.classList.add('modal-open')
  }, [setIsModalOpenAllFav])

  const closeSupport = useCallback(() => {
    setIsSupportOpen(false)
    document.body.classList.remove('modal-open')
  }, [])

  const closeModalAllBasket = useCallback(() => {
    setIsModalOpenAllBasket(false)
    document.body.classList.remove('modal-open')
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    document.body.classList.remove('modal-open')
  }, [setIsModalOpen, setProductIdToDelete])

  const closeModalAllFav = useCallback(() => {
    setIsModalOpenAllFav(false)
    document.body.classList.remove('modal-open')
  }, [setIsModalOpenAllFav])

  const closeModalAdvertisement = () => {
    setIsModalAdvertisementOpen(false)
    document.body.classList.remove('modal-open')
  }

  const handleClearBasketBtn = useCallback(() => {
    showModalAllBasket()
  }, [showModalAllBasket])

  const handleClearFavBtn = useCallback(() => {
    showModalAllFav()
  }, [showModalAllFav])

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
    setIsSearchProductOpen
  }
}