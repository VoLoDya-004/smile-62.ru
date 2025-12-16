import { favouritesApi } from '../api/favouritesApi'
import { setCartFavourites } from '../redux/FavouritesSlice'
import type { AppDispatch } from '@/redux'

export class FavouritesService {
  private dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }

  async loadFavourites (userId: number | null) {
    if (!userId) {
      this.dispatch(setCartFavourites([]))
      return []
    }

    const res = await favouritesApi.getFavourites(userId)

    if (res.success) {
      this.dispatch(setCartFavourites(res.data))
      return res.data
    } else {
      this.dispatch(setCartFavourites([]))
    }
  }

  async removeFromFavourites(userId: number | null, productId: number) {
    if (userId) {
      const res = await favouritesApi.deleteFromFavourites(userId, productId)
      this.dispatch(setCartFavourites(res.data))
      return res.data
    }
  }

  async clearFavourites(userId: number | null) {
    if (userId) {
      const res = await favouritesApi.clearFavourites(userId)
      this.dispatch(setCartFavourites(res.data))
      return res.data
    }
  }

  async addToBasketFromFavourites(userId: number | null, productId: number) {
    if (userId) {
      const res = await favouritesApi.addToBasketFromFavourites(userId, productId)
      this.dispatch(setCartFavourites(res.data))
      return res.data
    }
  }

  async refreshFavourites(userId: number | null) {
    if (userId) {
      const res = await favouritesApi.refreshFavourites(userId)
      this.dispatch(setCartFavourites(res.data))
      return res.data
    }
  }

  async addFavourites(idProduct: number, userId: number | null) {
    if (userId) {
      const res = await favouritesApi.addFavourites(idProduct, userId)
      this.dispatch(setCartFavourites(res.data))
      return res.data
    }
  }
}