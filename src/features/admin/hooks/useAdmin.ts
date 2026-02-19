import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { adminApi } from '../api/adminApi'
import type { IOrder, IOrdersResponse } from '../types/adminTypes'
import type { TProductFormData } from '../types/validationSchemas'

export const useAdmin = () => {
  const { showNotification } = useUIContextNotification()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const queryClient = useQueryClient()

  const ordersQuery = useQuery({
    queryKey: ['adminOrders', userId],
    queryFn: () => adminApi.getAllOrders(userId),
    enabled: !!userId
  })

  const statsQuery = useQuery({
    queryKey: ['adminStats', userId],
    queryFn: () => adminApi.getStats(userId),
    enabled: !!userId
  })

  const usersInfiniteQuery = useInfiniteQuery({
    queryKey: ['adminUsers', userId],
    queryFn: ({ pageParam = 1 }) => adminApi.getAllUsers(userId, pageParam, 30),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!userId
  })

  const users = usersInfiniteQuery.data?.pages.flatMap(page => page.users) || []

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number, status: string }) => 
      adminApi.updateOrderStatus(userId, orderId, status),
    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['adminOrders', userId] })
      
      const previousOrders = queryClient.getQueryData(['adminOrders', userId])
      
      queryClient.setQueryData(['adminOrders', userId], (old: IOrdersResponse) => {
        if (!old?.success) return old
        return {
          ...old,
          orders: old.orders.map((order: IOrder) =>
            order.id === orderId ? { ...order, status } : order
          )
        }
      })
      
      return { previousOrders }
    },
    onSuccess: (data) => {
      if (data.success && data.order) {
        queryClient.setQueryData(['adminOrders', userId], (old: IOrdersResponse) => {
          if (!old?.success) return old
          return {
            ...old,
            orders: old.orders.map(order =>
              order.id === data.order.id ? { ...order, ...data.order } : order
            )
          }
        })
      }
      showNotification('Статус заказа обновлен', 'success')
    },
    onError: (_error, _variables, context) => {
      showNotification('Ошибка при обновлении статуса', 'error')
      
      if (context?.previousOrders) {
        queryClient.setQueryData(['adminOrders', userId], context.previousOrders)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrders', userId] })
    }
  })

  const addProductMutation = useMutation({
    mutationFn: (productData: TProductFormData) => adminApi.addProduct(userId, productData),
    onSuccess: () => {
      showNotification('Товар добавлен', 'success')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: () => {
      showNotification('Ошибка при добавлении товара', 'error')
    }
  })

  const updateOrderStatus = (orderId: number, status: string) => {
    return updateOrderStatusMutation.mutateAsync({ orderId, status })
  }

  const addProduct = async (productData: TProductFormData) => {
    return addProductMutation.mutateAsync(productData)
  }

  return {
    orders: ordersQuery.data?.orders || [],
    stats: statsQuery.data?.stats || null,
    users,
    isLoadingOrders: ordersQuery.isPending,
    isLoadingStats: statsQuery.isPending,
    isLoadingUsers: usersInfiniteQuery.isPending,
    isUpdatingOrder: updateOrderStatusMutation.isPending,
    hasNextUsers: usersInfiniteQuery.hasNextPage,
    isFetchingNextUsers: usersInfiniteQuery.isFetchingNextPage,
    fetchNextUsers: usersInfiniteQuery.fetchNextPage,
    updateOrderStatus,
    addProduct
  }
}