import { memo } from 'react'
import type { IFav, IBasket } from '@/types/types'
import ButtonDeleteFavourites from '@/components/Button/ButtonDeleteFavourites'
import ButtonBasket from '@/components/Button/ButtonBasket'

    
interface IFavouritesProductsProps {
  productFavourites: IFav
  deleteProductFavourites: (id: number) => void
  cartBasket: IBasket[]
  addInBasketProductFavourites: (id: number) => Promise<void>
  cartFavourites: IFav[]
  isDeleting: boolean
}


const FavouritesProducts = ({
  productFavourites, 
  deleteProductFavourites, 
  cartBasket,
  addInBasketProductFavourites, 
  cartFavourites, 
  isDeleting
}: IFavouritesProductsProps) => {
  const { id, nazvanie, image, price_total } = productFavourites

  const priceFormatter = new Intl.NumberFormat('ru-RU')


  return (
    <article 
      className='favourites-box__product'
      aria-label={`Избранный товар ${nazvanie}`}
    >
      <div className='favourites-box__product-img'>
        <img 
          className='favourites-box__product-img' 
          src={image} 
          alt='Товар' 
        />
      </div>
      <div className='favourites-box__product-title'>
        {nazvanie}
      </div>
      <div className='favourites-box__product-price'>
        {priceFormatter.format(price_total)} руб.
      </div>           
      <ButtonBasket 
        cartFavourites={cartFavourites} 
        productFavourites={productFavourites} 
        addInBasketProductFavourites={addInBasketProductFavourites} 
        id={id} 
        cartBasket={cartBasket} 
      />
      <ButtonDeleteFavourites 
        deleteProductFavourites={deleteProductFavourites} 
        id={id} 
        isPendingDelete={isDeleting}
      />
    </article> 
  )
}

export default memo(FavouritesProducts)