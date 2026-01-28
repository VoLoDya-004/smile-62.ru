import { createContext, useContext, type ReactNode } from 'react'
import { useProducts } from '../hooks/useProducts'

type TProductsContextType = ReturnType<typeof useProducts>

export const ProductsContext = createContext<TProductsContextType | undefined>(undefined)

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProductsContext must be used within ProductsProvider')
  return context
}

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const products = useProducts()
  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
}
