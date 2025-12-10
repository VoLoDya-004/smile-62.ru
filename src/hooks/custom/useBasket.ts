import { API_URLS } from '@/constants/urls'
import type { RootStore } from '@/redux'
import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification, useModals } from '../index'
import { setCartBasket } from '@/redux/BasketSlice'
import axios from 'axios'


export const useBasket = () => {
  const { showNotification } = useNotification()
  const { setIsModalOpen, setIsModalOpenAllBasket, productIdToDelete } = useModals()

  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const cartBasket = useSelector((state: RootStore) => state.basket.cartBasket)

  const srcBasket = `${API_URLS.BASKET}?idUser=${userId}&Operation=showBasket`

  const [loadingDeleteAllBasket, setLoadingDeleteAllBasket] = useState(false)
  const [loadingBasket, setLoadingBasket] = useState(true)
  const [deletingBasket, setDeletingBasket] = useState<Set<number>>(new Set())

  const deleteProductBasket = useCallback((id: number | null) => {
    if (id && userId !== null) {
      setIsModalOpen(false)
      setDeletingBasket(prev => new Set(prev).add(id))

      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'deleteBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => {
        setDeletingBasket(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      })
    }
  }, [dispatch, userId, srcBasket])

  const handleClearBasket = useCallback(() => {
    if (userId !== null) {
      setIsModalOpenAllBasket(false)
      setLoadingDeleteAllBasket(true)
      
      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'clearBasket',
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => setLoadingDeleteAllBasket(false))
    }
  }, [dispatch, userId])

  const increaseBasket = useCallback((id: number, currentCount: number) => {
    if (userId !== null) {
      if (currentCount >= 100) return
      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'increaseBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
    }
  }, [dispatch, srcBasket])

  const decreaseBasket = useCallback((id: number, currentCount: number) => {
    if (userId !== null) {
      if (currentCount <= 1) return
      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'decreaseBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
    }
  }, [dispatch, srcBasket])

  const handleCountChange = useCallback((e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (userId !== null) {
      let newCount = e.target.value
      if (newCount === '') {
        newCount = '1'
      }
      if (Number(newCount) > 100) {
        newCount = '100'
      }

      axios.get(API_URLS.BASKET, {
        params: {
          Operation: 'updateCount',
          idProduct: id,
          count: newCount,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcBasket))
      .then((res) => dispatch(setCartBasket(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
    }
  }, [dispatch, srcBasket])

  const handleClearBasketProduct = useCallback(() => {
    deleteProductBasket(productIdToDelete)
  }, [productIdToDelete])

  const updateBasketData = useCallback(async () => {
    if (!userId) return
      
    await axios.get(API_URLS.FAVOURITES, {
      params: { 
        Operation: 'showBasket', 
        idUser: userId,
      }
    })
    const res = await axios.get(srcBasket)
    dispatch(setCartBasket(res.data))
  }, [userId, srcBasket, dispatch])

  useEffect(() => {
    if (userId !== null) {
      setLoadingBasket(true)
      axios.get(srcBasket)
      .then((res) => dispatch(setCartBasket(res.data)))
      .finally(() => setLoadingBasket(false))
    } else {
      setLoadingBasket(false)
      dispatch(setCartBasket([]))
    }
  }, [userId])

  return {
    srcBasket,
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
  }
}