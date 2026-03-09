import { useUIContextNotification } from '@/shared/providers/UIProvider'
import type { RootStore } from '@/shared/store'
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { adminApi } from '../api/adminApi'
import type { IOrder, IOrdersInfiniteData, IProduct, IProductsInfiniteData, IUser, IUsersInfiniteData, TAdminSelect } from '../types/adminTypes'

interface IUseAdminProps {
  userSearch: string
  userFilter: TAdminSelect
  orderSearch?: string
  orderSort?: 'asc' | 'desc'
  orderDeliveryTypes?: string[]
  orderStatuses?: string[]
  productSearch?: string 
  productCategory?: number 
  productMinPrice?: number 
  productMaxPrice?: number 
}

export const useAdmin = ({ 
  userSearch = '', 
  userFilter = 'all',
  orderSearch = '',
  orderSort = 'desc',
  orderDeliveryTypes = [],
  orderStatuses = [],
  productSearch = '', 
  productCategory = undefined,    
  productMinPrice = undefined,     
  productMaxPrice = undefined,     
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

  const productsInfiniteQuery = useInfiniteQuery({
    queryKey: [
      'adminProducts', 
      userId, 
      productSearch, 
      productCategory, 
      productMinPrice, 
      productMaxPrice
    ],
    queryFn: ({ pageParam = 1 }) => adminApi.getAllProducts(
      userId, 
      pageParam, 
      20,
      productSearch,
      productCategory,
      productMinPrice,
      productMaxPrice
    ),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!userId
  })

  const products = productsInfiniteQuery.data?.pages.flatMap(page => page.products || []) || [] 

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
    mutationFn: ({ orderId, status }: { orderId: number, status: string }) =>
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
      queryClient.invalidateQueries({ queryKey: ['adminStats', userId] })
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
    mutationFn: (formData: FormData) => adminApi.addProduct(userId, formData),
    onSuccess: async () => {
      showNotification('Товар добавлен', 'success')
      await queryClient.invalidateQueries({queryKey: 
        ['adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice]
      })    
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

  const updateProductMutation = useMutation({
    mutationFn: (formData: FormData) => adminApi.updateProduct(userId, formData),
    onSuccess: async () => {
      showNotification('Товар обновлен', 'success')
      await queryClient.invalidateQueries({ queryKey: 
        ['adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice] 
      })
    },
    onError: () => {
      showNotification('Ошибка при обновлении товара', 'error')
    }
  })

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => adminApi.deleteProduct(userId, productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: [
          'adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice
        ]
      })
      const previousProducts = queryClient.getQueryData(
        ['adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice]
      )
      queryClient.setQueryData<IProductsInfiniteData>(
        ['adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice],
        (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              products: page.products.filter((product: IProduct) => product.id !== productId) || []
            }))
          }
        }
      )
      return { previousProducts }
    },
    onSuccess: () => {
      showNotification('Товар удален', 'success')
    },
    onError: (_error, _variables, context) => {
      showNotification('Ошибка при удалении товара', 'error')
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ['adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice],
          context.previousProducts
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: 
        ['adminProducts', userId, productSearch, productCategory, productMinPrice, productMaxPrice] 
      })
    }
  })

  const updateProduct = (formData: FormData) => updateProductMutation.mutateAsync(formData)
  const deleteProduct = (productId: number) => deleteProductMutation.mutateAsync(productId)

  const updateUserAdminStatus = (targetUserId: number, isAdmin: boolean) => {
    return updateUserAdminStatusMutation.mutateAsync({ targetUserId, isAdmin })
  }

  const updateOrderStatus = (orderId: number, status: string) => {
    return updateOrderStatusMutation.mutateAsync({ orderId, status })
  }

  const addProduct = async (formData: FormData) => {
    return addProductMutation.mutateAsync(formData)
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
    products,
    isLoadingProducts: productsInfiniteQuery.isPending,
    hasNextProducts: productsInfiniteQuery.hasNextPage,
    isFetchingNextProducts: productsInfiniteQuery.isFetchingNextPage,
    isLoadingAddProducts: addProductMutation.isPending,
    isLoadingEditProducts: updateProductMutation.isPending,
    fetchNextProducts: productsInfiniteQuery.fetchNextPage,
    updateProduct,
    deleteProduct,
    addProduct
  }
}