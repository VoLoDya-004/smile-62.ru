import { apiClient } from '@/shared/api/axiosInstance'
import { API_URLS_FAVOURITES } from '../constants/apiConstants'

export const favouritesApi = {
  getFavourites: async (userId: number | null) => {
    const res = await apiClient.get(API_URLS_FAVOURITES, {
      params: {
        Operation: 'showFavourites',
        idUser: userId
      }
    })
    return res.data
  },

  deleteFromFavourites: async (userId: number, productId: number) => {
    await apiClient.delete(API_URLS_FAVOURITES, {
      data: {
        Operation: 'deleteFavourites',
        idProduct: productId,
        idUser: userId
      }
    })
    return favouritesApi.getFavourites(userId)
  },

  clearFavourites: async (userId: number) => {
    await apiClient.delete(API_URLS_FAVOURITES, {
      data: {
        Operation: 'clearFavourites',
        idUser: userId
      }
    })
    return favouritesApi.getFavourites(userId)
  },

  addToBasketFromFavourites: async (userId: number, productId: number) => {
    await apiClient.post(API_URLS_FAVOURITES, {
      Operation: 'addBasket',
      idProduct: productId,
      idUser: userId
    })
    return favouritesApi.getFavourites(userId)
  },

  addFavourites: async (idProduct: number, userId: number | null) => {
    await apiClient.post(API_URLS_FAVOURITES, {
      Operation: 'addFavourites',
      idProduct: idProduct,
      idUser: userId
    })
    return favouritesApi.getFavourites(userId)
  }
}