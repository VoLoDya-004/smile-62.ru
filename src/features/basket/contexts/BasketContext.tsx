import { createContext, useContext, type ChangeEvent, type ReactNode } from 'react'
import { useBasket } from '../hooks/useBasket'
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

const BasketContext = createContext<IBasketContextType | undefined>(undefined)

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const basket = useBasket()

  const value = {
    cartBasket: basket.cartBasket,
    loadingDeleteAllBasket: basket.loadingDeleteAllBasket,
    loadingBasket: basket.loadingBasket,
    deletingBasket: basket.deletingBasket,
    handleCountChange: basket.handleCountChange,
    decreaseBasket: basket.decreaseBasket,
    increaseBasket: basket.increaseBasket,
    handleClearBasket: basket.handleClearBasket,
    deleteProductBasket: basket.deleteProductBasket,
    setLoadingBasket: basket.setLoadingBasket,
    updateBasketData: basket.updateBasketData,
  }

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export const useBasketContext = () => {
  const context = useContext(BasketContext)
  if (!context) throw new Error('useBasketContext must be used within BasketProvider')
  return context
}