import { useFavourites } from '../hooks/useFavourites'
import type { IFav } from '../types/favouritesTypes'
import FavouritesProducts from './FavouritesProducts'

const FavouritesList = () => {
  const { cartFavourites } = useFavourites()

  return (
    <>
      {cartFavourites.map((productFavourites: IFav) => (
        <FavouritesProducts key={productFavourites.id} productFavourites={productFavourites} />
      ))}
    </>
  )
}

export default FavouritesList