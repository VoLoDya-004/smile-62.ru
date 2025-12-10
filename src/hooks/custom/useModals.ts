import { useCallback, useState } from 'react'

export const useModals = () => {
  const [isModalAdvertisementOpen, setIsModalAdvertisementOpen] = useState(false)

  const closeModalAdvertisement = () => {
    setIsModalAdvertisementOpen(false)
    document.body.classList.remove('modal-open')
  }

  const OpenModalAdvertisement = () => {
    setIsModalAdvertisementOpen(true)
    document.body.classList.add('modal-open')
  }

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

  return {
    isModalAdvertisementOpen,
    isModalOpen,
    isSupportOpen,
    isModalOpenAllBasket,
    isModalOpenAllFav,
    productIdToDelete,
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
    setIsModalOpen,
    setIsModalOpenAllBasket,
    setIsModalOpenAllFav,
  }
}