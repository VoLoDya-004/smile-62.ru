import { useEffect, useState } from 'react'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import type { IBasket } from '@/features/basket/types/basketTypes'
import ButtonDeleteFavourites from '@/shared/ui/buttons/ButtonDeleteFavourites'
import ButtonBasket from '@/shared/ui/buttons/ButtonBasket'
import styles from './Favourites.module.scss'

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
  const {
    'favourites-box__product': product,
    'favourites-box__product-img': productImage,
    'favourites-box__product-title': productTitle,
    'favourites-box__product-price': productPrice
  } = styles

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
    <article className={product} aria-label={`Избранный товар ${nazvanie}`}>
      {hasAvif ? (
        <picture className={productImage}>
          <source 
            srcSet={`/images/tovar/${image}.avif`} 
            type='image/avif' 
          />
          <img 
            className={productImage}
            loading='lazy'
            decoding='async'
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </picture>
      ) : (
        <div className={productImage}>
          <img 
            className={productImage}
            src={`/images/tovar/${image}.png`}
            alt='Товар'
          />
        </div>
      )}
      <div className={productTitle}>
        {nazvanie}
      </div>
      <div className={productPrice}>
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