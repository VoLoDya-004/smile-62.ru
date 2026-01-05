import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import styles from './Basket.module.scss'

const BasketFooter = () => {
  const {
    'basket-box__footer': boxFooter,
    'basket-box__footer-title': boxFooterTitle
  } = styles

  const priceFormatter = new Intl.NumberFormat('ru-RU')

  const totalBasket = useSelector((state: RootStore) => state.basket.total)

  return (                          
    <div className={boxFooter}>
      <div className={boxFooterTitle}>
        {totalBasket.count} шт.
      </div>
      <div>
        {priceFormatter.format(totalBasket.price_total)}  руб.
      </div>
    </div>
  )
}

export default BasketFooter