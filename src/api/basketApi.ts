import { API_URLS } from '@/constants/urls'
import axios from 'axios'

export const basketApi = {
  getBasket: (userId: number | null) => 
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'showBasket',
          idUser: userId,
        }
      })
      .then((res) => ({
        success: true,
        data: res.data,
      }))
      .catch(() => ({
        success: false,
        data: [],
      })),

  deleteFromBasket: (userId: number, productId: number) => 
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'deleteBasket',
          idProduct: productId,
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  clearBasket: (userId: number) => 
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'clearBasket',
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  increaseBasket: (userId: number, productId: number) =>
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'increaseBasket',
          idProduct: productId,
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  decreaseBasket: (userId: number, productId: number) =>
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'decreaseBasket',
          idProduct: productId,
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  updateBasketCount: (userId: number, productId: number, count: number) => 
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'updateCount',
          idProduct: productId,
          count: count,
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  refreshBasket: (userId: number) =>
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'showBasket',
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  addBasket: (idProduct: number, userId: number | null) =>
    axios
      .get(API_URLS.BASKET, {
        params: {
          Operation: 'addBasket',
          idProduct: idProduct,
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId))
}