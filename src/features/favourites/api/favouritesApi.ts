import { API_URLS_FAVOURITES } from '../constants/apiConstants'
import axios from 'axios'

export const favouritesApi = {
  getFavourites: (userId: number | null) =>
    axios
      .get(API_URLS_FAVOURITES, {
        params: {
          Operation: 'showFavourites',
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

  deleteFromFavourites: (userId: number, productId: number) =>
    axios
      .delete(API_URLS_FAVOURITES, {
        data: {
          Operation: 'deleteFavourites',
          idProduct: productId,
          idUser: userId,
        }
      })
      .then(() => favouritesApi.getFavourites(userId)),

  clearFavourites: (userId: number) => 
    axios
      .delete(API_URLS_FAVOURITES, {
        data: {
          Operation: 'clearFavourites',
          idUser: userId,
        }
      })
      .then(() => favouritesApi.getFavourites(userId)),

  addToBasketFromFavourites: (userId: number, productId: number) =>
    axios
      .post(API_URLS_FAVOURITES, {
        Operation: 'addBasket',
        idProduct: productId,
        idUser: userId,
      })
      .then(() => favouritesApi.getFavourites(userId)),

  refreshFavourites: (userId: number) =>
    axios
      .get(API_URLS_FAVOURITES, {
        params: {
          Operation: 'showFavourites',
          idUser: userId,
        }
      })
      .then(() => favouritesApi.getFavourites(userId)),

  addFavourites: (idProduct: number, userId: number | null) =>
    axios
      .post(API_URLS_FAVOURITES, {
        Operation: 'addFavourites',
        idProduct: idProduct,
        idUser: userId,
      })
      .then(() => favouritesApi.getFavourites(userId))
}