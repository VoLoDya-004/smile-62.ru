import { memo } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../../redux'


const BasketFooter = () => {
  const priceFormatter = new Intl.NumberFormat('ru-RU')

  const totalBasket = useSelector((state: RootStore) => state.basket.total)
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


  return (                          
    <div className={`basket-box__footer ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className='basket-box__footer-title'>
        {totalBasket.count} шт.
      </div>
      <div>
        {priceFormatter.format(totalBasket.price_total)}  руб.
      </div>
    </div>
  )
}

export default memo(BasketFooter)