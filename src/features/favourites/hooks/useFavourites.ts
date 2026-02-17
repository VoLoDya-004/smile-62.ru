import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { favouritesApi } from '../api/favouritesApi'
import type { IFav } from '../types/favouritesTypes'
import { useState } from 'react'

export const useFavourites = () => {
  const { showNotification } = useUIContextNotification()

  const userId = useSelector((state: RootStore) => state.user.userId)

  const queryClient = useQueryClient()

  const [addingFavouritesIds, setAddingFavouritesIds] = useState<Set<number>>(new Set())
  const [addingToBasketIds, setAddingToBasketIds] = useState<Set<number>>(new Set())

  const favouritesQuery = useQuery({
    queryKey: ['favourites', userId],
    queryFn: () => favouritesApi.getFavourites(userId),
    enabled: !!userId
  })

  const deleteMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!userId) throw new Error('No user ID')
      return favouritesApi.deleteFromFavourites(userId, productId)
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['favourites', userId] })
      const previosFavourites = queryClient.getQueryData(['favourites', userId])
      queryClient.setQueryData(['favourites', userId], 
        (old: IFav[]) => old?.filter(item => item.id_product !== productId) || []
      )
      setAddingFavouritesIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
      return { previosFavourites }
    },
    onSuccess() {
      showNotification('Товар удален из избранного', 'success')  
    },
    onError(_error, _variables, context) {
      if (context?.previosFavourites) {
        queryClient.setQueryData(['favourites', userId], context.previosFavourites)
      }
      showNotification('Ошибка при удалении товара', 'error')
    }
  })

  const clearFavouritesMutation = useMutation({
    mutationFn: () => {
      if (!userId) throw new Error('No user ID')
      return favouritesApi.clearFavourites(userId)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favourites', userId] })
      const previosFavourites = queryClient.getQueryData(['favourites', userId])
      queryClient.setQueryData(['favourites', userId], [])
      setAddingFavouritesIds(new Set())
      return { previosFavourites }
    },
    onSuccess: () => {
      showNotification('Избранное очищено', 'success')
    },
    onError: (_error, _variables, context) => {
      if (context?.previosFavourites) {
        queryClient.setQueryData(['favourites', userId], context.previosFavourites)
      }
      showNotification('Ошибка при очистке избранного', 'error')
    }
  })

  const addFavouritesMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!userId) throw new Error('No user ID')
      return favouritesApi.addFavourites(productId, userId)
    },
    onMutate: async (productId) => {
      setAddingFavouritesIds(prev => new Set(prev).add(productId))
      await queryClient.cancelQueries({ queryKey: ['favourites', userId] })
      const previosFavourites = queryClient.getQueryData(['favourites', userId])
      return { previosFavourites }
    },
    onSuccess: (updatedFavourites) => {
      queryClient.setQueryData(['favourites', userId], updatedFavourites)
      showNotification('Добавлено в избранное', 'success')
    },
    onError: (_error, _variables, context) => {
      if (context?.previosFavourites) {
        queryClient.setQueryData(['favourites', userId], context.previosFavourites)
      }
      showNotification('Ошибка при добавлении в избранное', 'error')
    },
    onSettled: (productId) => {
      setAddingFavouritesIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }
  })

  const addToBasketFromFavouritesMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!userId) throw new Error('No user ID')
      return favouritesApi.addToBasketFromFavourites(userId, productId)
    },
    onMutate: async (productId) => {
      setAddingToBasketIds(prev => new Set(prev).add(productId))
      await queryClient.cancelQueries({ queryKey: ['favourites', userId] })
      const previosFavourites = queryClient.getQueryData(['favourites', userId])
      return { previosFavourites }
    },
    onSuccess: async (updatedFavourites, productId) => {
      queryClient.setQueryData(['favourites', userId], updatedFavourites)
      showNotification('Товар добавлен в корзину', 'success')
      await queryClient.invalidateQueries({ queryKey: ['basket', userId] })
      setAddingToBasketIds(prev => { 
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    },
    onError: (_error, productId, context) => {
      if (context?.previosFavourites) {
        queryClient.setQueryData(['favourites', userId], context.previosFavourites)
      }
      showNotification('Ошибка добавления в корзину', 'error')
      setAddingToBasketIds(prev => { 
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }
  })

  const deleteProductFavourites = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleClearFav = () => {
    clearFavouritesMutation.mutate()
  }

  const addInBasketProductFavourites = (id: number) => {
    addToBasketFromFavouritesMutation.mutate(id)
  }

  const addFavourites = (id: number) => {
    addFavouritesMutation.mutate(id)
  }

  return {
    cartFavourites: favouritesQuery.data || [],
    loadingFavourites: favouritesQuery.isPending,
    loadingAddFavourites: addingFavouritesIds,
    loadingAddToBasket: addingToBasketIds,
    deleteProductFavourites,
    handleClearFav,
    addInBasketProductFavourites,
    addFavourites
  }
}