import { memo, type JSX } from 'react'
import BasketHeader from './BasketHeader'
import BasketFooter from './BasketFooter'
import BasketClearString from '../BasketClearString'


interface IBasketBoxProps {
  productsBasket: JSX.Element[]
}


const BasketBox = ({productsBasket}: IBasketBoxProps) => {

    
  return (
    <section className='basket-box'>
      <BasketClearString />
      <section className='basket-box__table'>
        <BasketHeader />
        {productsBasket}
        <BasketFooter />
      </section>
    </section>
  )
}

export default memo(BasketBox)
