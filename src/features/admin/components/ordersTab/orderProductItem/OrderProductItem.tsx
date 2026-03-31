import type { IOrderItem } from '../../../types/adminTypes'
import { formatPrice } from '@/shared/utils/formatters'
import styles from './OrderProductItem.module.scss'
import Image from 'next/image'

export const OrderProductItem = ({ item }: { item: IOrderItem }) => {
  const {
    'order-product': orderProduct,
    'order-product__image': orderProductImage,
    'order-product__image-img': orderProductImageImg,
    'order-product__info': orderProductInfo
  } = styles
  
  return (
    <div key={item.id} className={orderProduct}>
      <div className={orderProductImage}>
        <Image
          src={`/uploads/tovar/${item.product_image}.avif`}
          alt={item.product_name}
          width={80}
          height={80}
          loading='lazy'
          decoding='async'
          className={orderProductImageImg}
        />
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