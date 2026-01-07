import axios from 'axios'
import { API_URLS_BASKET } from '../constants/apiConstants'

export const basketApi = {
  getBasket: (userId: number | null) => 
    axios
      .get(API_URLS_BASKET, {
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
      .delete(API_URLS_BASKET, {
        data: {
          Operation: 'deleteBasket',
          idProduct: productId,
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  clearBasket: (userId: number) => 
    axios
      .delete(API_URLS_BASKET, {
        data: {
          Operation: 'clearBasket',
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  increaseBasket: (userId: number, productId: number) =>
    axios
      .patch(API_URLS_BASKET, {
        Operation: 'increaseBasket',
        idProduct: productId,
        idUser: userId,
      })
      .then(() => basketApi.getBasket(userId)),

  decreaseBasket: (userId: number, productId: number) =>
    axios
      .patch(API_URLS_BASKET, {
        Operation: 'decreaseBasket',
        idProduct: productId,
        idUser: userId,
      })
      .then(() => basketApi.getBasket(userId)),

  updateBasketCount: (userId: number, productId: number, count: number) => 
    axios
      .patch(API_URLS_BASKET, {
        Operation: 'updateCount',
        idProduct: productId,
        count: count,
        idUser: userId,
      })
      .then(() => basketApi.getBasket(userId)),

  refreshBasket: (userId: number) =>
    axios
      .get(API_URLS_BASKET, {
        params: {
          Operation: 'showBasket',
          idUser: userId,
        }
      })
      .then(() => basketApi.getBasket(userId)),

  addBasket: (idProduct: number, userId: number | null) =>
    axios
      .post(API_URLS_BASKET, {
        Operation: 'addBasket',
        idProduct: idProduct,
        idUser: userId,
      })
      .then(() => basketApi.getBasket(userId))
}