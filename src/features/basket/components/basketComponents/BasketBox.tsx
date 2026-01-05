import { type ReactNode } from 'react'
import BasketHeader from './BasketHeader'
import BasketFooter from './BasketFooter'
import BasketClearString from './BasketClearString'
import styles from './Basket.module.scss'

interface IBasketBoxProps {
  children: ReactNode
}

const BasketBox = ({ children }: IBasketBoxProps) => {
  const {
    'basket-box': box,
    'basket-box__table': boxTable
  } = styles

  return (
    <section className={box}>
      <BasketClearString />
      <section className={boxTable}>
        <BasketHeader />
        {children}
        <BasketFooter />
      </section>
    </section>
  )
}

export default BasketBox
