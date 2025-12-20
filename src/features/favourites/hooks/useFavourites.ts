import type { RootStore } from '@/shared/store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '@/shared/hooks'
import { FavouritesService } from '../services/favouritesService'
import { API_URLS_FAVOURITES } from '../constants/apiConstants'

export const useFavourites = () => {
  const { showNotification } = useNotification()

  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const cartFavourites = useSelector((state: RootStore) => state.favourites.cartFavourites)

  const [loadingDeleteAllFav, setLoadingDeleteAllFav] = useState(false)
  const [loadingFavourites, setLoadingFavourites] = useState(true)
  const [deletingFavourites, setDeletingFavourites] = useState<Set<number>>(new Set())
  
  const favouritesService = useMemo(() => new FavouritesService(dispatch), [dispatch])

  const srcFavourites = `${API_URLS_FAVOURITES}?idUser=${userId}&Operation=showFavourites`

  const deleteProductFavourites = useCallback(async (id: number) => {
    if (userId !== null) {
      setDeletingFavourites(prev => new Set(prev).add(id))

      try {
        await favouritesService.removeFromFavourites(userId, id)
      } catch { 
        showNotification('Ошибка', 'error')
      } finally {
        setDeletingFavourites(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }
    }
  }, [favouritesService, userId, showNotification])

  const handleClearFav = useCallback(async () => {
    if (userId !== null) {
      setLoadingDeleteAllFav(true)

      try {
        await favouritesService.clearFavourites(userId)
      } catch {
        showNotification('Ошибка', 'error')
      } finally {
        setLoadingDeleteAllFav(false)
      }
    }
  }, [userId, favouritesService, showNotification])

  const addInBasketProductFavourites = useCallback(async (id: number): Promise<void> => {
    if (userId !== null) {
      try {
        await favouritesService.addToBasketFromFavourites(userId, id)
      } catch {
        showNotification('Ошибка', 'error')
      }
    }
  }, [userId, favouritesService, showNotification])

  const updateFavouritesData = useCallback(async () => {
    if (userId !== null) {
      try {
        await favouritesService.refreshFavourites(userId)
      } catch {
        showNotification('Ошибка', 'error')
      }
    }
  }, [userId, favouritesService, showNotification])

  const loadFavourites = useCallback(async () => {
    setLoadingFavourites(true)
    try {
      await favouritesService.loadFavourites(userId)
    } catch {
      showNotification('Ошибка', 'error')
    } finally {
      setLoadingFavourites(false)
    }
  }, [userId, favouritesService, showNotification])

  useEffect(() => {
    loadFavourites()
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