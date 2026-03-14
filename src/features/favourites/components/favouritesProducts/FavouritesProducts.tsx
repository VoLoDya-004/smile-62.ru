import { useEffect, useState } from 'react'
import type { IFav } from '@/features/favourites/types/favouritesTypes'
import { formatPrice } from '@/shared/utils/formatters'
import ButtonProductDelete from '@/shared/ui/buttons/ButtonProductDelete'
import ButtonBasket from '@/shared/ui/buttons/ButtonBasket'
import styles from './FavouritesProducts.module.scss'
import { useFavourites } from '../../hooks/useFavourites'

const FavouritesProducts = ({ productFavourites }: { productFavourites :IFav }) => {
  const {
    'product': product,
    'product__img': productImage,
    'product__title': productTitle,
    'product__price': productPrice
  } = styles

  const { id, nazvanie, image, price_sale, id_product } = productFavourites

  const { deleteProductFavourites } = useFavourites()

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
        {formatPrice(price_sale ?? 0)} руб.
      </div>           
      <ButtonBasket 
        productFavourites={productFavourites} 
        id={id} 
      />
      <ButtonProductDelete 
        onClick={() => deleteProductFavourites(id_product)}
        ariaLabel='Удалить выбранный товар из избранного'
      />
    </article> 
  )
}

export default FavouritesProducts