import type { ReactNode } from 'react'
import { useFavourites } from '../hooks/useFavourites'
import { FavouritesContext } from '../contexts/FavouritesContext'

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