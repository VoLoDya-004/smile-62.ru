import axios from 'axios'
import { API_URLS_DELIVERY, API_URLS_ORDERS } from '../constants/apiConstants'

export const ordersApi = {
  getDeliveryMethods: async () => {
    const res = await axios.get(API_URLS_DELIVERY)
    return res.data
  },

  createOrder: async (userId: number | null, data: {
    deliveryAddress: string
    deliveryMethodId: number
    customerNotes?: string
  }) => {
    const res = await axios.post(API_URLS_ORDERS, {
      Operation: 'createOrder',
      idUser: userId,
      ...data
    })
    return res.data
  },

  getUserOrders: async (userId: number | null) => {
    const res = await axios.get(API_URLS_ORDERS, {
      params: {
        Operation: 'getUserOrders',
        idUser: userId
      }
    })
    return res.data
  },

  getOrderDetails: async (userId: number, orderId: number) => {
    const res = await axios.get(API_URLS_ORDERS, {
      params: {
        Operation: 'getOrderDetails',
        idUser: userId,
        orderId: orderId
      }
    })
    return res.data
  }
}