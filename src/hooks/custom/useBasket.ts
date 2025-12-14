import { API_URLS } from '@/constants/urls'
import type { RootStore } from '@/redux'
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification, useModals } from '../index'
import { BasketService } from '@/services/basketService'


export const useBasket = () => {
  const { showNotification } = useNotification()
  const { setIsModalOpen } = useModals()

  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const cartBasket = useSelector((state: RootStore) => state.basket.cartBasket)

  const basketService = useMemo(() => new BasketService(dispatch), [dispatch])

  const srcBasket = `${API_URLS.BASKET}?idUser=${userId}&Operation=showBasket`

  const [loadingDeleteAllBasket, setLoadingDeleteAllBasket] = useState(false)
  const [loadingBasket, setLoadingBasket] = useState(true)
  const [deletingBasket, setDeletingBasket] = useState<Set<number>>(new Set())

  const deleteProductBasket = useCallback(async (id: number | null) => {
    if (id && userId !== null) {
      setIsModalOpen(false)
      setDeletingBasket(prev => new Set(prev).add(id))

      try {
      await basketService.removeFromBasket(userId, id)
      } catch {
        showNotification('Ошибка', 'error')
      } finally {
        setDeletingBasket(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }
    }
  }, [basketService, userId, showNotification, setIsModalOpen])

  const handleClearBasket = useCallback(async () => {
    if (userId !== null) {
      setLoadingDeleteAllBasket(true)

      try {
        await basketService.clearBasket(userId)
      } catch {
        showNotification('Ошибка', 'error')
      } finally {
        setLoadingDeleteAllBasket(false)
      }
    }
  }, [userId, basketService, showNotification])

  const increaseBasket = useCallback(async (id: number, currentCount: number) => {
    if (userId !== null && currentCount < 100) {
      await basketService.increaseBasket(userId, id)
    }
  }, [userId, basketService, showNotification])

  const decreaseBasket = useCallback(async (id: number, currentCount: number) => {
    if (userId !== null && currentCount > 1) {
      await basketService.decreaseBasket(userId, id)
    }
  }, [userId, basketService, showNotification])

  const handleCountChange = useCallback(async (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (userId !== null) {
      let newCount = e.target.value
      if (newCount === '') {
        newCount = '1'
      }
      if (Number(newCount) > 100) {
        newCount = '100'
      }

      try {
        await basketService.updateBasketCount(userId, id, Number(newCount))
      } catch {
        showNotification('Ошибка', 'error')
      }
    }
  }, [userId, basketService, showNotification])

  const updateBasketData = useCallback(async () => {
    if (userId !== null) {
      await basketService.refreshBasket(userId)
    }
  }, [userId, basketService, showNotification])

  const loadBasket = useCallback(async () => {
    setLoadingBasket(true)
    try {
      await basketService.loadBasket(userId)
    } catch {
      showNotification('Ошибка', 'error')
    } finally {
      setLoadingBasket(false)
    }
  }, [userId, basketService, showNotification])

  useEffect(() => {
    loadBasket()
  }, [userId])

  return {
    srcBasket,
    cartBasket,
    loadingDeleteAllBasket,
    loadingBasket,
    deletingBasket,
    handleCountChange,
    decreaseBasket,
    increaseBasket,
    handleClearBasket,
    deleteProductBasket,
    setLoadingBasket,
    updateBasketData,
  }
}