import { basketApi } from '../api/basketApi'
import type { AppDispatch } from '@/shared/store'
import { setCartBasket } from '@/shared/store/slices/BasketSlice'

export class BasketService {
  private dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }

  async loadBasket (userId: number | null) {
    if (!userId) {
      this.dispatch(setCartBasket([]))
      return []
    }

    const res = await basketApi.getBasket(userId)

    if (res.success) {
      this.dispatch(setCartBasket(res.data))
      return res.data
    } else {
      this.dispatch(setCartBasket([]))
    }
  }

  async removeFromBasket (userId: number | null, productId: number) {
    if (userId) {
      const res = await basketApi.deleteFromBasket(userId, productId)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }

  async clearBasket(userId: number | null) {
    if (userId) {
      const res = await basketApi.clearBasket(userId)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }

  async increaseBasket(userId: number | null, productId: number) {
    if (userId) {
      const res = await basketApi.increaseBasket(userId, productId)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }

  async decreaseBasket(userId: number | null, productId: number) {
    if (userId) {
      const res = await basketApi.decreaseBasket(userId, productId)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }

  async updateBasketCount(userId: number | null, productId: number, count: number) {
    if (userId) {
      const res = await basketApi.updateBasketCount(userId, productId, count)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }

  async refreshBasket(userId: number | null) {
    if (userId) {
      const res = await basketApi.refreshBasket(userId)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }

  async addBasket(idProduct: number, userId: number | null) {
    if (userId) {
      const res = await basketApi.addBasket(idProduct, userId)
      this.dispatch(setCartBasket(res.data))
      return res.data
    }
  }
}