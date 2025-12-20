import { useFavouritesContext } from '@/features/favourites/contexts/FavouritesContext'
import { useBasket } from '@/shared/hooks'
import FavouritesProducts from './favouritesTable/FavouritesProducts'

const FavouritesList = () => {
  const { 
    cartFavourites, 
    deleteProductFavourites, 
    addInBasketProductFavourites,
    deletingFavourites
  } = useFavouritesContext()

  const { cartBasket } = useBasket()

  return (
    <>
      {cartFavourites.map((productFavourites) => (
        <FavouritesProducts 
          productFavourites={productFavourites} 
          key={productFavourites.id} 
          deleteProductFavourites={deleteProductFavourites}
          addInBasketProductFavourites={addInBasketProductFavourites}
          cartBasket={cartBasket} 
          cartFavourites={cartFavourites}
          isDeleting={deletingFavourites.has(productFavourites.id)}
        />
      ))}
    </>
  )
}

export default FavouritesList