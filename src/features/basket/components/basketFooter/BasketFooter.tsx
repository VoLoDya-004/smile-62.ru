import { formatPrice } from '@/shared/utils/formatters'
import { useBasket } from '../../hooks/useBasket'
import type { IBasket, IBasketTotal } from '../../types/basketTypes'
import styles from './BasketFooter.module.scss'

const BasketFooter = () => {
  const {
    'basket-footer': footer,
    'basket-footer__count': footerCount
  } = styles

  let { cartBasket } = useBasket()

  cartBasket = cartBasket.filter((item: IBasket) => item.id > 0)

  const total = cartBasket.reduce((acc: IBasketTotal, item: IBasket) => {
    const count = Number(item.count)
    const price = Number(item.price_sale) || 0

    acc.count += (isNaN(count) || count <= 0) ? 0 : count
    acc.price += price * count

    return acc
  }, { count: 0, price: 0 })

  return (                          
    <div className={footer}>
      <div className={footerCount}>
        {total.count} шт.
      </div>
      <div>
        {formatPrice(total.price)} руб.
      </div>
    </div>
  )
}

export default BasketFooter