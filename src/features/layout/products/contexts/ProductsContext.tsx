import { useProducts } from "../hooks/useProducts"
import { createContext, useContext } from 'react'

type TProductsContextType = ReturnType<typeof useProducts>

export const ProductsContext = createContext<TProductsContextType | undefined>(undefined)

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProductsContext must be used within ProductsProvider')
  return context
}