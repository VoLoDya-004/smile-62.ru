import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { ordersApi } from '../api/ordersApi'

export const useOrders = () => {
  const { showNotification } = useUIContextNotification()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const queryClient = useQueryClient()

  const deliveryMethodsQuery = useQuery({
    queryKey: ['deliveryMethods'],
    queryFn: () => ordersApi.getDeliveryMethods()
  })

  const userOrdersQuery = useQuery({
    queryKey: ['userOrders', userId],
    queryFn: () => ordersApi.getUserOrders(userId),
    enabled: !!userId
  })

  const createOrderMutation = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (data: {
      deliveryAddress: string
      deliveryMethodId: number
      customerNotes?: string
    }) => {
      return ordersApi.createOrder(userId, data)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['basket', userId] })
      const previousBasket = queryClient.getQueryData(['basket', userId])
      queryClient.setQueryData(['basket', userId], [])
      return { previousBasket }
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['userOrders', userId] })
        queryClient.invalidateQueries({ queryKey: ['wallet', userId] })
        queryClient.invalidateQueries({ queryKey: ['basket', userId] })
      }
    },
    onError: (_error, _variables, context) => {
      showNotification('Ошибка создания заказа', 'error')
      if (context?.previousBasket) {
        queryClient.setQueryData(['basket', userId], context.previousBasket)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['basket', userId] })
    }
  })

  const createOrder = async (data: {
    deliveryAddress: string
    deliveryMethodId: number
    customerNotes?: string
  }) => {
    return createOrderMutation.mutateAsync(data)
  }

  const isCreatingOrder = useIsMutating({ mutationKey: ['createOrder'] }) > 0

  return {
    deliveryMethods: deliveryMethodsQuery.data || [],
    isLoadingDeliveryMethods: deliveryMethodsQuery.isPending,
    userOrders: userOrdersQuery.data || [],
    isLoadingUserOrders: userOrdersQuery.isPending,
    createOrder,
    isCreatingOrder
  }
}