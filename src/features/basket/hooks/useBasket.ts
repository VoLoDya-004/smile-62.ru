import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { basketApi } from '../api/basketApi'
import { useDispatch, useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import type { ChangeEvent } from 'react'
import type { IBasket } from '../types/basketTypes'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import { addAddingBasketId, clearAddingBasketIds, removeAddingBasketId } from '@/shared/store/slices/basketSlice'

export const useBasket = () => {
  const { showNotification } = useUIContextNotification()
  const queryClient = useQueryClient()

  const dispatch = useDispatch()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const addingIds = useSelector((state: RootStore) => state.basket.addingIds)

  const isAdding = addingIds.length > 0
  const isLoadingProductBasket = (productId: number) => addingIds.includes(productId)

  const basketQuery = useQuery({
    queryKey: ['basket', userId],
    queryFn: () => basketApi.getBasket(userId),
    enabled: !!userId
  })

  const deleteMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!userId) throw new Error('No user ID')
      return basketApi.deleteFromBasket(userId, productId)
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['basket', userId] })
      const previousBasket = queryClient.getQueryData(['basket', userId])
      queryClient.setQueryData(['basket', userId], 
        (old: IBasket[]) => old?.filter(item => item.id !== productId) || []
      )   
      dispatch(removeAddingBasketId(productId))
      return { previousBasket }
    },
    onSuccess: () => {
      showNotification('Товар удален из корзины', 'success')
    },
    onError: (_error, _variables, context) => {
      if (context?.previousBasket) {
        queryClient.setQueryData(['basket', userId], context.previousBasket)
      }
      showNotification('Ошибка при удалении товара', 'error')
    }
  })

  const clearBasketMutation = useMutation({
    mutationFn: () => {
      if (!userId) throw new Error('No user ID')
      return basketApi.clearBasket(userId)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['basket', userId] })
      const previousBasket = queryClient.getQueryData(['basket', userId])
      queryClient.setQueryData(['basket', userId], [])
      dispatch(clearAddingBasketIds())
      return { previousBasket }
    },
    onSuccess: () => {
      showNotification('Корзина очищена', 'success')
    },
    onError: (_error, _variables, context) => {
      if (context?.previousBasket) {
        queryClient.setQueryData(['basket', userId], context.previousBasket)
      }
      showNotification('Ошибка при очистке корзины', 'error')
    }
  })

  const updateCountMutation = useMutation({
    mutationFn: ({ productId, count }: { productId: number, count: number }) => {
      if (!userId) throw new Error('No user ID')
      return basketApi.updateBasketCount(userId, productId, count)
    },
    onMutate: async ({ productId, count }) => {
      await queryClient.cancelQueries({ queryKey: ['basket', userId] })
      const previousBasket = queryClient.getQueryData(['basket', userId])
      queryClient.setQueryData(['basket', userId], (old: IBasket[]) => 
        old?.map(item => 
          item.id === productId 
            ? { ...item, count: count}
            : item
        ) || []
      )
      return { previousBasket }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousBasket) {
        queryClient.setQueryData(['basket', userId], context.previousBasket)
      }
      showNotification('Ошибка при изменении количества', 'error')
    }
  })

  const addBasketMutation = useMutation({
    mutationFn: (productId: number) => {
      if (!userId) throw new Error('No user ID')
      return basketApi.addBasket(productId, userId)
    },
    onMutate: async (productId) => {
      dispatch(addAddingBasketId(productId))
      await queryClient.cancelQueries({ queryKey: ['basket', userId] })
      const previousBasket = queryClient.getQueryData<IBasket[]>(['basket', userId])    
      return { previousBasket }
    },
    onSuccess: (updatedBasket) => {
      queryClient.setQueryData(['basket', userId], updatedBasket)
      showNotification('Добавлено в корзину', 'success')
    },
    onError: () => {
      showNotification('Ошибка при добавлении в корзину', 'error')
    },
    onSettled: (_data, _error, variables) => {
      if (variables) {
        dispatch(removeAddingBasketId(variables))
      }
    }
  })

  const deleteProductBasket = (id: number | null) => {
    if (id) {
      deleteMutation.mutate(id)
    }
  }

  const handleClearBasket = () => {
    clearBasketMutation.mutate()
  }

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (!userId) return
    
    let newCount = e.target.value
    if (newCount === '') return
    if (Number(newCount) <= 0) newCount = '1'
    if (Number(newCount) > 100) newCount = '100'
    
    updateCountMutation.mutate({ 
      productId: id, 
      count: Number(newCount) 
    })
  }

  const addBasket = (productId: number) => {
    addBasketMutation.mutate(productId)
  }

  const decreaseBasket = (id: number, currentCount: number) => {
    if (currentCount > 1) {
      updateCountMutation.mutate({ productId: id, count: currentCount - 1 })
    }
  }

  const increaseBasket = (id: number, currentCount: number) => {
    if (currentCount < 100) {
      updateCountMutation.mutate({ productId: id, count: currentCount + 1 })
    }
  }

  return {
    cartBasket: basketQuery.data || [],
    loadingBasket: basketQuery.isPending,
    loadingAddBasket: addingIds,
    isAdding, 
    isLoadingProductBasket,
    handleCountChange,
    decreaseBasket, 
    increaseBasket,
    handleClearBasket,
    deleteProductBasket,
    addBasket
  }
}