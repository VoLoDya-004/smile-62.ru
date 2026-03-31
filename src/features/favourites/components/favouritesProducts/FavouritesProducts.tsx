import type { IFav } from '@/features/favourites/types/favouritesTypes'
import { formatPrice } from '@/shared/utils/formatters'
import ButtonProductDelete from '@/shared/ui/buttons/ButtonProductDelete'
import ButtonBasket from '@/shared/ui/buttons/ButtonBasket'
import styles from './FavouritesProducts.module.scss'
import { useFavourites } from '../../hooks/useFavourites'
import Image from 'next/image'

const FavouritesProducts = ({ productFavourites }: { productFavourites :IFav }) => {
  const {
    'product': product,
    'product__img': productImage,
    'product__img-wrapper': productImageWrapper,
    'product__title': productTitle,
    'product__price': productPrice
  } = styles

  const { id, nazvanie, image, price_sale, id_product } = productFavourites

  const { deleteProductFavourites } = useFavourites()

  return (
    <article className={product} aria-label={`Избранный товар ${nazvanie}`}>
      <div className={productImageWrapper}>
        <Image
          src={`/uploads/tovar/${image}.avif`}
          alt={nazvanie ? nazvanie : 'Товар'}
          width={210}
          height={0}
          loading='lazy'
          decoding='async'
          className={productImage}
        />
      </div>
      <div className={productTitle}>{nazvanie}</div>
      <div className={productPrice}>{formatPrice(price_sale ?? 0)} руб.</div>           
      <ButtonBasket productFavourites={productFavourites} id={id} />
      <ButtonProductDelete 
        onClick={() => deleteProductFavourites(id_product)}
        ariaLabel='Удалить выбранный товар из избранного'
      />
    </article> 
  )
}

export default FavouritesProducts