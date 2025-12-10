import { API_URLS } from '@/constants/urls'
import type { RootStore } from '@/redux'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification, useModals } from '../index'
import { setCartFavourites } from '@/redux/FavouritesSlice'
import axios from 'axios'

export const useFavourites = () => {
  const { showNotification } = useNotification()
  const { setIsModalOpenAllFav, closeModalAllFav } = useModals()

  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const cartFavourites = useSelector((state: RootStore) => state.favourites.cartFavourites)

  const [loadingDeleteAllFav, setLoadingDeleteAllFav] = useState(false)
  const [loadingFavourites, setLoadingFavourites] = useState(true)
  const [deletingFavourites, setDeletingFavourites] = useState<Set<number>>(new Set())

  const srcFavourites = `${API_URLS.FAVOURITES}?idUser=${userId}&Operation=showFavourites`

  const deleteProductFavourites = useCallback((id: number) => {
    if (userId !== null) {
      setDeletingFavourites(prev => new Set(prev).add(id))

      axios.get(API_URLS.FAVOURITES, {
        params: {
          Operation: 'deleteFavourites',
          idProduct: id,
          idUser: userId,
        }
      })
      .then(() => axios.get(srcFavourites))
      .then((res) => dispatch(setCartFavourites(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => {
        setDeletingFavourites(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      })
    }
  }, [dispatch, userId])

  const handleClearFav = useCallback(() => {
    if (userId !== null) {
      setIsModalOpenAllFav(false)
      setLoadingDeleteAllFav(true)

      axios.get(API_URLS.FAVOURITES, {
        params: {
          Operation: 'clearFavourites',
          idUser: userId,
        }
      })
      .then(() => axios.get(srcFavourites))
      .then((res) => dispatch(setCartFavourites(res.data)))
      .catch(() => showNotification('Ошибка', 'error'))
      .finally(() => {
        setLoadingDeleteAllFav(false)
        closeModalAllFav()
      })
    }
  }, [dispatch, userId])

  const addInBasketProductFavourites = useCallback(async (id: number): Promise<void> => {
    if (userId !== null) {
      await axios.get(API_URLS.FAVOURITES, {
        params: {
          Operation: 'addBasket',
          idProduct: id,
          idUser: userId,
        }
      })
      const res = await axios.get(srcFavourites)
      dispatch(setCartFavourites(res.data))
    }
  }, [dispatch, userId])

  const updateFavouritesData = useCallback(async () => {
    if (!userId) return
    
    await axios.get(API_URLS.FAVOURITES, {
      params: { 
        Operation: 'showBasket', 
        idUser: userId,
      }
    })
    const res = await axios.get(srcFavourites)
    dispatch(setCartFavourites(res.data))
  }, [userId, srcFavourites, dispatch])

  useEffect(() => {
    if (userId !== null) {
      setLoadingFavourites(true)
      axios.get(srcFavourites)
      .then((res) => dispatch(setCartFavourites(res.data)))
      .finally(() => setLoadingFavourites(false))
    } else {
      setLoadingFavourites(false)
      dispatch(setCartFavourites([]))
    }
  }, [userId])

  return { 
    srcFavourites,
    cartFavourites,
    loadingFavourites,
    deletingFavourites,
    loadingDeleteAllFav,
    deleteProductFavourites,
    addInBasketProductFavourites,
    setLoadingFavourites,
    handleClearFav,
    updateFavouritesData,
  }
}