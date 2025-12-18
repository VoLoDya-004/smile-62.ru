import { createContext, useContext, type ReactNode } from 'react'
import { useFavourites } from '@/hooks'
import type { IFav } from '@/types/types'

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

const FavouritesContext = createContext<IFavouritesContextType | undefined>(undefined)

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const favourites = useFavourites()

  const value = {
    cartFavourites: favourites.cartFavourites,
    loadingFavourites: favourites.loadingFavourites,
    loadingDeleteAllFav: favourites.loadingDeleteAllFav,
    deletingFavourites: favourites.deletingFavourites,
    handleClearFav: favourites.handleClearFav,
    deleteProductFavourites: favourites.deleteProductFavourites,
    addInBasketProductFavourites: favourites.addInBasketProductFavourites,
    setLoadingFavourites: favourites.setLoadingFavourites,
    updateFavouritesData: favourites.updateFavouritesData,
  }

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext)
  if (!context) throw new Error('useFavouritesContext must be used within FavouritesProvider')
  return context
}