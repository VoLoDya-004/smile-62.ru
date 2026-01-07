import { createContext, useContext } from 'react'
import type { IFav } from '../types/favouritesTypes'

interface IFavouritesContextType {
  cartFavourites: IFav[]
  loadingFavourites: boolean
  loadingDeleteAllFav: boolean
  deletingFavourites: Set<number>
  handleClearFav:() => Promise<void>
  deleteProductFavourites: (id: number) => void
  addInBasketProductFavourites: (id: number) => Promise<void>
  setLoadingFavourites: (loading: boolean) => void
  updateFavouritesData: () => Promise<void>
}

export const FavouritesContext = createContext<IFavouritesContextType | undefined>(undefined)

export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext)
  if (!context) throw new Error('useFavouritesContext must be used within FavouritesProvider')
  return context
}