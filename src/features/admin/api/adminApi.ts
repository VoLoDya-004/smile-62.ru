import { API_URLS_ADMIN } from '../constants/apiConstants'
import type { TProductFormData } from '../types/validationSchemas'
import axios from 'axios'

export const adminApi = {
  getAllOrders: async (userId: number | null, page: number = 1, limit: number = 15) => {
    const res = await axios.get(API_URLS_ADMIN, {
      params: {
        Operation: 'getAllOrders',
        idUser: userId,
        page,
        limit
      }
    })
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

  getAllUsers: async (userId: number | null, page: number = 1, limit: number = 30) => {
    const res = await axios.get(API_URLS_ADMIN, {
      params: {
        Operation: 'getAllUsers',
        idUser: userId,
        page,
        limit
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

  addProduct: async (userId: number | null, productData: TProductFormData) => {
    const res = await axios.post(API_URLS_ADMIN, {
      Operation: 'addProduct',
      idUser: userId,
      ...productData
    })
    return res.data
  }
}