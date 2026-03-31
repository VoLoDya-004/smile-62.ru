import { Provider } from 'react-redux'
import { store } from '../store'
import { QueryProvider } from './QueryProvider'
import { UIProvider } from './UIProvider'
import type { ReactNode } from 'react'
import { ProductsProvider } from '../../features/products/providers/ProductsProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <UIProvider>
          <ProductsProvider>
            {children}
          </ProductsProvider>
        </UIProvider>
      </QueryProvider>
    </Provider>
  )
}