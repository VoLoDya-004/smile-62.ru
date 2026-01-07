import type { ReactNode } from 'react'
import { useBasket } from '../hooks/useBasket'
import { BasketContext } from '../contexts/BasketContext'

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