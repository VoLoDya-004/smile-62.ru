import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { favouritesApi } from '../api/favouritesApi'
import type { IFav } from '../types/favouritesTypes'
import { removeAddingFavId, addAddingFavId, clearAddingFavIds } from '@/shared/store/slices/favouritesSlice'
import { addAddingBasketId, removeAddingBasketId } from '@/shared/store/slices/basketSlice'

export const useFavourites = () => {
  const { showNotification } = useUIContextNotification()

  const dispatch = useDispatch()
  const addingIds = useSelector((state: RootStore) => state.favourites.addingIds)
  const userId = useSelector((state: RootStore) => state.user.userId)

  const queryClient = useQueryClient()

  const isAdding = addingIds.length > 0
  const isLoadingProductFav = (productId: number) => addingIds.includes(productId)

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
      dispatch(removeAddingFavId(productId))
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
      dispatch(clearAddingFavIds())
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
      dispatch(addAddingFavId(productId))
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
    onSettled: (_data, _error, variables) => {
      if (variables) {
        dispatch(removeAddingFavId(variables))
      }
    }
  })

  const addToBasketFromFavouritesMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!userId) throw new Error('No user ID')
      return favouritesApi.addToBasketFromFavourites(userId, productId)
    },
    onMutate: async (productId) => {
      dispatch(addAddingBasketId(productId))
      await queryClient.cancelQueries({ queryKey: ['favourites', userId] })
      const previosFavourites = queryClient.getQueryData(['favourites', userId])
      return { previosFavourites }
    },
    onSuccess: async (updatedFavourites) => {
      queryClient.setQueryData(['favourites', userId], updatedFavourites)
      showNotification('Товар добавлен в корзину', 'success')
      await queryClient.invalidateQueries({ queryKey: ['basket', userId] })
    },
    onError: (_error, _variables, context) => {
      if (context?.previosFavourites) {
        queryClient.setQueryData(['favourites', userId], context.previosFavourites)
      }
      showNotification('Ошибка добавления в корзину', 'error')
    },
    onSettled: (_data, _error, variables) => {
      if (variables) {
        dispatch(removeAddingBasketId(variables))
      }
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
    isAdding,
    isLoadingProductFav,
    deleteProductFavourites,
    handleClearFav,
    addInBasketProductFavourites,
    addFavourites
  }
}