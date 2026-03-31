import { useFavourites } from '../hooks/useFavourites'
import type { IFav } from '../types/favouritesTypes'
import FavouritesProducts from './favouritesProducts/FavouritesProducts'

const FavouritesList = ({ initialFavourites = [] }: { initialFavourites?: IFav[] }) => {
  const { cartFavourites } = useFavourites()

  const displayFavourites = initialFavourites.length > 0 ? initialFavourites : cartFavourites

  return (
    <>
      {displayFavourites.map((productFavourites: IFav) => (
        <FavouritesProducts key={productFavourites.id} productFavourites={productFavourites} />
      ))}
    </>
  )
}

export default FavouritesList