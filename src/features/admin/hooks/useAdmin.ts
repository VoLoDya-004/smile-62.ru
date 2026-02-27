import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { adminApi } from '../api/adminApi'
import type { IOrder, IOrdersInfiniteData, IUser, IUsersInfiniteData, TAdminSelect } from '../types/adminTypes'
import type { TProductFormData } from '../types/validationSchemas'

interface IUseAdminProps {
  userSearch: string
  userFilter: TAdminSelect
  orderSearch?: string
  orderSort?: 'asc' | 'desc'
  orderDeliveryTypes?: string[]
  orderStatuses?: string[]
}

export const useAdmin = ({ 
  userSearch = '', 
  userFilter = 'all',
  orderSearch = '',
  orderSort = 'desc',
  orderDeliveryTypes = [],
  orderStatuses = []
}: IUseAdminProps ) => {
  const { showNotification } = useUIContextNotification()
  const userId = useSelector((state: RootStore) => state.user.userId)
  const queryClient = useQueryClient()

  const ordersInfiniteQuery = useInfiniteQuery({
    queryKey: ['adminOrders', userId, orderSearch, orderSort, orderDeliveryTypes, orderStatuses],
    queryFn: ({ pageParam = 1 }) => 
      adminApi.getAllOrders(
        userId, 
        pageParam, 
        15,
        orderSearch,
        orderSort,
        orderDeliveryTypes,
        orderStatuses
      ),
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
    queryKey: ['adminUsers', userId, userSearch, userFilter],
    queryFn: ({ pageParam = 1 }) => 
      adminApi.getAllUsers(userId, pageParam, 30, userSearch, userFilter),
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
      pages: oldData.pages.map((page) => {
        if (!page.orders) return page
        return {
          ...page,
          orders: page.orders.map((order) =>
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
      await queryClient.cancelQueries({ 
        queryKey: ['adminOrders', userId, orderSearch, orderSort, orderDeliveryTypes, orderStatuses] 
      })
      const previousOrders = queryClient.getQueryData(
        ['adminOrders', userId, orderSearch, orderSort, orderDeliveryTypes, orderStatuses]
      )
      queryClient.setQueryData(
        ['adminOrders', userId, orderSearch, orderSort, orderDeliveryTypes, orderStatuses], 
        (old: IOrdersInfiniteData) => {
          return updateOrderInCache(old, orderId, { status })
        }
      )
      return { previousOrders }
    },
    onSuccess: (data) => {
      if (data.success && data.order) {
        queryClient.setQueryData(
          ['adminOrders', userId, orderSearch, orderSort, orderDeliveryTypes, orderStatuses], 
          (old: IOrdersInfiniteData) => {
            return updateOrderInCache(old, data.order.id, data.order)
          }
        )
      }
      showNotification('Статус заказа обновлен', 'success')
    },
    onError: (_error, _variables, context) => {
      showNotification('Ошибка при обновлении статуса', 'error')
      if (context?.previousOrders) {
        queryClient.setQueryData(
          ['adminOrders', userId, orderSearch, orderSort, orderDeliveryTypes, orderStatuses], 
          context.previousOrders
        )
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

  const updateUserInCache = (
    oldData: IUsersInfiniteData,
    targetUserId: number,
    updates: Partial<IUser>
  ) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        users: page.users.map((user) => 
          user.id_user === targetUserId ? { ...user, ...updates } : user
        )
      }))
    }
  }

  const updateUserAdminStatusMutation = useMutation({
    mutationFn: ({ targetUserId, isAdmin }: { targetUserId: number, isAdmin: boolean }) => 
      adminApi.updateUserAdminStatus(userId, targetUserId, isAdmin),
    onMutate: async ({ targetUserId, isAdmin }) => {
      await queryClient.cancelQueries({ queryKey: ['adminUsers', userId, userSearch, userFilter] })
      const previousUsers = queryClient.getQueryData(['adminUsers', userId, userSearch, userFilter])
      queryClient.setQueryData(['adminUsers', userId, userSearch, userFilter], 
        (old: IUsersInfiniteData) => {
          return updateUserInCache(old, targetUserId, { is_admin: isAdmin ? 1 : 0 })
        }
      )
      return { previousUsers }
    },
    onSuccess: (data, _variables, context) => {
      if (data.success && data.user) {
        queryClient.setQueryData(['adminUsers', userId, userSearch, userFilter], 
          (old: IUsersInfiniteData) => {
            return updateUserInCache(old, data.user.id_user, { is_admin: data.user.is_admin })
          }
        )
        showNotification('Права администратора обновлены', 'success')
      } else {
        if (context?.previousUsers) {
          queryClient.setQueryData(['adminUsers', userId, userSearch, userFilter], 
            context.previousUsers
          )
        }
        showNotification('Ошибка при обновлении прав', 'error')
      }
    },
    onError(_error, _variables, context) {
      showNotification('Ошибка при обновлении прав', 'error')
      if (context?.previousUsers) {
        queryClient.setQueryData(['adminUsers', userId, userSearch, userFilter], 
          context.previousUsers
        )
      }
    }
  })

  const updateUserAdminStatus = (targetUserId: number, isAdmin: boolean) => {
    return updateUserAdminStatusMutation.mutateAsync({ targetUserId, isAdmin })
  }

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
    userSearch,
    userFilter,
    fetchNextUsers: usersInfiniteQuery.fetchNextPage,
    updateUserAdminStatus,
    addProduct
  }
}