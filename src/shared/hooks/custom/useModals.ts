import { useCallback, useState } from 'react'

export const useModals = () => {
  const [isModalAdvertisementOpen, setIsModalAdvertisementOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isModalOpenAllBasket, setIsModalOpenAllBasket] = useState(false)
  const [isModalOpenAllFav, setIsModalOpenAllFav] = useState(false)

  const openSupport = useCallback(() => {
    setIsSupportOpen(true)
  }, [])

  const OpenModalAdvertisement = () => {
    setIsModalAdvertisementOpen(true)
    document.body.classList.add('modal-open')
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
  }
}