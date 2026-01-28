import { formatPrice } from '@/shared/utils/formatters'
import { useBasket } from '../../hooks/useBasket'
import type { IBasket, IBasketTotal } from '../../types/basketTypes'
import styles from './Basket.module.scss'

const BasketFooter = () => {
  const {
    'basket-box__footer': boxFooter,
    'basket-box__footer-title': boxFooterTitle
  } = styles

  let { cartBasket } = useBasket()

  cartBasket = cartBasket.filter((item: IBasket) => item.id > 0)

  const total = cartBasket.reduce((acc: IBasketTotal, item: IBasket) => {
    const count = Number(item.count)
    const price_total = Number(item.price_total) || 0

    acc.count += (isNaN(count) || count <= 0) ? 0 : count
    acc.price_total += price_total * count

    return acc
  }, { count: 0, price_total: 0 })

  return (                          
    <div className={boxFooter}>
      <div className={boxFooterTitle}>
        {total.count} шт.
      </div>
      <div>
        {formatPrice(total.price_total)} руб.
      </div>
    </div>
  )
}

export default BasketFooter