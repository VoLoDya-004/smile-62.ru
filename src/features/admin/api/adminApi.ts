import { API_URLS_ADMIN } from '../constants/apiConstants'
import type { IGetAllOrdersParams, IGetAllProductsParams, TAdminSelect } from '../types/adminTypes'
import axios from 'axios'

export const adminApi = {
  getAllOrders: async (
    userId: number | null,
    page: number = 1, 
    limit: number = 15,
    search: string = '',
    sortDate: 'asc' | 'desc' = 'desc',
    deliveryTypes: string[] = [],
    statuses: string[] = []
  ) => {
    const params: IGetAllOrdersParams = {
      Operation: 'getAllOrders',
      idUser: userId,
      page,
      limit
    }
    if (search) params.search = search
    if (sortDate !== 'desc') params.sortDate = sortDate
    if (deliveryTypes.length) params.deliveryTypes = deliveryTypes.join(',')
    if (statuses.length) params.statuses = statuses.join(',')
    const res = await axios.get(API_URLS_ADMIN, { params })
    return res.data
  },

  getStats: async (userId: number | null) => {
    const res = await axios.get(API_URLS_ADMIN, {
      params: {
        Operation: 'getStats',
        idUser: userId
      }
    })
    return res.data
  },

  getAllUsers: async (
    userId: number | null, 
    page: number = 1, 
    limit: number = 30,
    search: string = '',
    filterAdmin: TAdminSelect = 'all'
  ) => {
    const res = await axios.get(API_URLS_ADMIN, {
      params: {
        Operation: 'getAllUsers',
        idUser: userId,
        page,
        limit,
        search,
        filterAdmin
      }
    })
    return res.data
  },

  updateOrderStatus: async (userId: number | null, orderId: number, status: string) => {
    const res = await axios.patch(API_URLS_ADMIN, {
      Operation: 'updateOrderStatus',
      idUser: userId,
      orderId,
      status
    })
    return res.data
  },

  addProduct: async (userId: number | null, formData: FormData) => {
    formData.append('Operation', 'addProduct')
    if (userId) formData.append('idUser', String(userId))

    const res = await axios.post(API_URLS_ADMIN, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  },

  updateUserAdminStatus: async (userId: number | null, targetUserId: number, isAdmin: boolean) => {
    const res = await axios.patch(API_URLS_ADMIN, {
      Operation: 'updateUserAdminStatus',
      idUser: userId,
      targetUserId,
      isAdmin
    })
    return res.data
  },

  getAllProducts: async (
    userId: number | null, 
    page: number = 1, 
    limit: number = 20,
    search: string = '',
    categoryId: number = 0,
    minPrice?: number,
    maxPrice?: number
  ) => {
    const params: IGetAllProductsParams = {
      Operation: 'getAllProducts',
      idUser: userId,
      page,
      limit
    }
    if (search) params.search = search
    if (categoryId > 0) params.categoryId = categoryId
    if (minPrice !== undefined && minPrice !== null && String(minPrice) !== '') 
      params.minPrice = minPrice
    if (maxPrice !== undefined && maxPrice !== null && String(maxPrice) !== '') 
      params.maxPrice = maxPrice
    const res = await axios.get(API_URLS_ADMIN, { params })
    return res.data
  },

  getProduct: async (userId: number | null, productId: number) => {
    const params = {
      Operation: 'getProduct',
      idUser: userId,
      productId
    }
    const res = await axios.get(API_URLS_ADMIN, { params })
    return res.data
  },

  updateProduct: async (userId: number | null, formData: FormData) => {
    formData.append('Operation', 'updateProduct')
    if (userId) formData.append('idUser', String(userId))
    const res = await axios.post(API_URLS_ADMIN, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
  },

  deleteProduct: async (userId: number | null, productId: number) => {
    const res = await axios.delete(API_URLS_ADMIN, {
      data: {
        Operation: 'deleteProduct',
        idUser: userId,
        id: productId
      }
    })
    return res.data
  }
}