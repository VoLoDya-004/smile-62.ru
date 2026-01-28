import axios from 'axios'

const API_URLS_BASKET = '/backend/PHP/basket.php'

export const basketApi = {
  getBasket: async (userId: number | null) => {
    const res = await axios.get(API_URLS_BASKET, {
      params: {
        Operation: 'showBasket',
        idUser: userId
      }
    })
    return res.data
  },

  deleteFromBasket: async (userId: number, productId: number) => {
    await axios.delete(API_URLS_BASKET, {
      data: {
        Operation: 'deleteBasket',
        idProduct: productId,
        idUser: userId
      }
    })
    return basketApi.getBasket(userId)
  },

  clearBasket: async (userId: number) => {
    await axios.delete(API_URLS_BASKET, {
      data: {
        Operation: 'clearBasket',
        idUser: userId
      }
    })
    return basketApi.getBasket(userId)
  },

  increaseBasket: async (userId: number, productId: number) => {
    await axios.patch(API_URLS_BASKET, {
      Operation: 'increaseBasket',
      idProduct: productId,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  },

  decreaseBasket: async (userId: number, productId: number) => {
    await axios.patch(API_URLS_BASKET, {
      Operation: 'decreaseBasket',
      idProduct: productId,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  },

  updateBasketCount: async (userId: number, productId: number, count: number) => {
    await axios.patch(API_URLS_BASKET, {
      Operation: 'updateCount',
      idProduct: productId,
      count: count,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  },

  addBasket: async (idProduct: number, userId: number | null) => {
    await axios.post(API_URLS_BASKET, {
      Operation: 'addBasket',
      idProduct: idProduct,
      idUser: userId,
    })
    return basketApi.getBasket(userId)
  }
}