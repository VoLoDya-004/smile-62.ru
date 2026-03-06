import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../store'
import { QueryProvider } from './QueryProvider'
import { UIProvider } from './UIProvider'
import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ProductsProvider } from '../../features/layout/products/providers/ProductsProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <BrowserRouter>
          <HelmetProvider>
            <UIProvider>
              <ProductsProvider>
                {children}
              </ProductsProvider>
            </UIProvider>
          </HelmetProvider>
        </BrowserRouter>
      </QueryProvider>
    </Provider>
  )
}