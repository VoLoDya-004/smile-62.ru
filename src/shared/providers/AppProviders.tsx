import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../store'
import { QueryProvider } from './QueryProvider'
import { UIProvider } from './UIProvider'
import type { ReactNode } from 'react'
import { ProductsProvider } from '../../features/layout/products/providers/ProductsProvider'
import { FavouritesProvider } from '@/features/favourites/providers/FavouritesProvider'
import { BasketProvider } from '@/features/basket/providers/BasketProvider'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <BrowserRouter>
          <UIProvider>
            <ProductsProvider>
              <FavouritesProvider>
                <BasketProvider>
                  {children}
                </BasketProvider>
              </FavouritesProvider>
            </ProductsProvider>
          </UIProvider>
        </BrowserRouter>
      </QueryProvider>
    </Provider>
  )
}