import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { adminApi } from '../api/adminApi'
import type { IOrder, IOrdersInfiniteData, IOrdersPage } from '../types/adminTypes'
import type { TProductFormData } from '../types/validationSchemas'

export const useAdmin = () => {
  const { showNotification } = useUIContextNotification()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const queryClient = useQueryClient()

  const ordersInfiniteQuery = useInfiniteQuery({
    queryKey: ['adminOrders', userId],
    queryFn: ({ pageParam = 1 }) => adminApi.getAllOrders(userId, pageParam, 15),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!userId
  })

  const orders = ordersInfiniteQuery.data?.pages.flatMap(page => page.orders) || []

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

  const updateOrderInCache = (
    oldData: IOrdersInfiniteData, 
    orderId: number, 
    updates: Partial<IOrder>
  ) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      pages: oldData.pages.map((page: IOrdersPage) => {
        if (!page.orders) return page
        return {
          ...page,
          orders: page.orders.map((order: IOrder) =>
            order.id === orderId ? { ...order, ...updates } : order
          )
        }
      })
    }
  }

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: string }) =>
      adminApi.updateOrderStatus(userId, orderId, status),
    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['adminOrders', userId] })
      const previousOrders = queryClient.getQueryData(['adminOrders', userId])
      queryClient.setQueryData(['adminOrders', userId], (old: IOrdersInfiniteData) => {
        return updateOrderInCache(old, orderId, { status })
      })
      return { previousOrders }
    },
    onSuccess: (data) => {
      if (data.success && data.order) {
        queryClient.setQueryData(['adminOrders', userId], (old: IOrdersInfiniteData) => {
          return updateOrderInCache(old, data.order.id, data.order)
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
    orders,
    isLoadingOrders: ordersInfiniteQuery.isPending,
    isUpdatingOrder: updateOrderStatusMutation.isPending,
    hasNextOrders: ordersInfiniteQuery.hasNextPage,
    isFetchingNextOrders: ordersInfiniteQuery.isFetchingNextPage,
    fetchNextOrders: ordersInfiniteQuery.fetchNextPage,
    stats: statsQuery.data?.stats || null,
    isLoadingStats: statsQuery.isPending,
    updateOrderStatus,
    users,
    isLoadingUsers: usersInfiniteQuery.isPending,
    hasNextUsers: usersInfiniteQuery.hasNextPage,
    isFetchingNextUsers: usersInfiniteQuery.isFetchingNextPage,
    fetchNextUsers: usersInfiniteQuery.fetchNextPage,
    addProduct
  }
}