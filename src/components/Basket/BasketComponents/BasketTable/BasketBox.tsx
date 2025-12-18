import { type ReactNode } from 'react'
import BasketHeader from './BasketHeader'
import BasketFooter from './BasketFooter'
import BasketClearString from '../BasketClearString'

interface IBasketBoxProps {
  children: ReactNode
}

const BasketBox = ({ children }: IBasketBoxProps) => {

  return (
    <section className='basket-box'>
      <BasketClearString />
      <section className='basket-box__table'>
        <BasketHeader />
        {children}
        <BasketFooter />
      </section>
    </section>
  )
}

export default BasketBox
