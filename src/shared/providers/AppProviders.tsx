import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../store'
import { QueryProvider } from './QueryProvider'
import { UIProvider } from './UIProvider'
import type { ReactNode } from 'react'
import { ProductsProvider } from '../../features/layout/products/providers/ProductsProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <BrowserRouter>
          <UIProvider>
            <ProductsProvider>
              {children}
            </ProductsProvider>
          </UIProvider>
        </BrowserRouter>
      </QueryProvider>
    </Provider>
  )
}