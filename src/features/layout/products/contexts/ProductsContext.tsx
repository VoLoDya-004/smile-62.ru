import { useProducts } from "../hooks/useProducts"
import { createContext, useContext, type ReactNode } from 'react'

type TProductsContextType = ReturnType<typeof useProducts>

const ProductsContext = createContext<TProductsContextType | undefined>(undefined)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const products = useProducts()
  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProductsContext must be used within ProductsProvider')
  return context
}