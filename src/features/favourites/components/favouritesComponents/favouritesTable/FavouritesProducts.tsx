import { useEffect, useState } from 'react'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import type { IBasket } from '@/features/basket/types/basketTypes'
import ButtonDeleteFavourites from '@/shared/ui/buttons/ButtonDeleteFavourites'
import ButtonBasket from '@/shared/ui/buttons/ButtonBasket'

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

  const [hasAvif, setHasAvif] = useState(true)

  useEffect(() => {
    const img = new Image()
    const handleLoad = () => setHasAvif(true)
    const handleError = () => setHasAvif(false)
    
    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)
    img.src = `/images/tovar/${image}.avif`

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
      img.src = ''
    }
  }, [image])

  return (
    <article 
      className='favourites-box__product'
      aria-label={`Избранный товар ${nazvanie}`}
    >
      {hasAvif ? (
        <picture className='favourites-box__product-img'>
          <source 
            srcSet={`/images/tovar/${image}.avif`} 
            type='image/avif' 
          />
          <img 
            className='favourites-box__product-img'
            loading='lazy'
            decoding='async'
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </picture>
      ) : (
        <div className='favourites-box__product-img'>
          <img 
            className='favourites-box__product-img'
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </div>
      )}
      <div className='favourites-box__product-title'>
        {nazvanie}
      </div>
      <div className='favourites-box__product-price'>
        {priceFormatter.format(price_total ?? 0)} руб.
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

export default FavouritesProducts