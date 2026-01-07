import type { ReactNode } from 'react'
import { useProducts } from '../../../../shared/hooks'
import { ProductsContext } from '@/features/layout/products/contexts/ProductsContext'

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const products = useProducts()
  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
}