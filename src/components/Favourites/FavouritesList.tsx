import { useFavouritesContext } from '@/contexts/FavouritesContext'
import { useBasket } from '@/hooks'
import FavouritesProducts from './FavouritesComponents/FavouritesTable/FavouritesProducts'

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