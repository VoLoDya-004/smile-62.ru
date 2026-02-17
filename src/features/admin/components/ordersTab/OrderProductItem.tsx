import { useEffect, useState } from 'react'
import type { IOrderItem } from '../../types/adminTypes'
import { formatPrice } from '@/shared/utils/formatters'
import styles from '../AdminPanel.module.scss'

export const OrderProductItem = ({ item }: { item: IOrderItem }) => {
  const {
    'order-product': orderProduct,
    'order-product__image': orderProductImage,
    'order-product__info': orderProductInfo
  } = styles
  
  const [hasAvif, setHasAvif] = useState(true)

  useEffect(() => {
    const img = new Image()
    const handleLoad = () => setHasAvif(true)
    const handleError = () => setHasAvif(false)

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)
    img.src = `/images/tovar/${item.product_image}.avif`

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
      img.src = ''
    }
  }, [item.product_image])

  return (
    <div key={item.id} className={orderProduct}>
      <div className={orderProductImage}>
        {hasAvif ? (
          <picture>
            <source
              srcSet={`/images/tovar/${item.product_image}.avif`}
              type='image/avif'
            />
            <img
              loading='lazy'
              decoding='async'
              src={`/images/tovar/${item.product_image}.png`}
              alt={item.product_name}
            />
          </picture>
        ) : (
          <img
            src={`/images/tovar/${item.product_image}.png`}
            alt={item.product_name}
          />
        )}
      </div>
      <div className={orderProductInfo}>
        <div>{item.product_name}</div>
        <div>
          {item.quantity} × {formatPrice(parseFloat(item.price_at_moment))} ₽
        </div>
        <div>
          Итого: {formatPrice(parseFloat(item.price_at_moment) * item.quantity)} ₽
        </div>
      </div>
    </div>
  )
}