import { apiClient } from '@/shared/api/axiosInstance'
import { API_URLS_BASKET } from '../constants/apiConstants'

export const basketApi = {
  getBasket: async (userId: number | null) => {
    const res = await apiClient.get(API_URLS_BASKET, {
      params: {
        Operation: 'showBasket',
        idUser: userId
      }
    })
    return res.data
  },

  deleteFromBasket: async (userId: number, productId: number) => {
    await apiClient.delete(API_URLS_BASKET, {
      data: {
        Operation: 'deleteBasket',
        idProduct: productId,
        idUser: userId
      }
    })
    return basketApi.getBasket(userId)
  },

  clearBasket: async (userId: number) => {
    await apiClient.delete(API_URLS_BASKET, {
      data: {
        Operation: 'clearBasket',
        idUser: userId
      }
    })
    return basketApi.getBasket(userId)
  },

  increaseBasket: async (userId: number, productId: number) => {
    await apiClient.patch(API_URLS_BASKET, {
      Operation: 'increaseBasket',
      idProduct: productId,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  },

  decreaseBasket: async (userId: number, productId: number) => {
    await apiClient.patch(API_URLS_BASKET, {
      Operation: 'decreaseBasket',
      idProduct: productId,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  },

  updateBasketCount: async (userId: number, productId: number, count: number) => {
    await apiClient.patch(API_URLS_BASKET, {
      Operation: 'updateCount',
      idProduct: productId,
      count: count,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  },

  addBasket: async (idProduct: number, userId: number | null) => {
    await apiClient.post(API_URLS_BASKET, {
      Operation: 'addBasket',
      idProduct: idProduct,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  }
}