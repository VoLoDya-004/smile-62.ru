import { createContext, useContext, type ChangeEvent } from 'react'
import type { ICartItem } from '../types/basketTypes'

interface IBasketContextType {
  cartBasket: ICartItem[]
  loadingDeleteAllBasket: boolean
  loadingBasket: boolean
  deletingBasket: Set<number>
  handleCountChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
  decreaseBasket: (id: number, currentCount: number) => Promise<void>
  increaseBasket: (id: number, currentCount: number) => Promise<void>
  handleClearBasket: () => Promise<void>
  deleteProductBasket: (id: number | null) => Promise<void>
  setLoadingBasket: (loading: boolean) => void
  updateBasketData: () => Promise<void>
}

export const BasketContext = createContext<IBasketContextType | undefined>(undefined)

export const useBasketContext = () => {
  const context = useContext(BasketContext)
  if (!context) throw new Error('useBasketContext must be used within BasketProvider')
  return context
}