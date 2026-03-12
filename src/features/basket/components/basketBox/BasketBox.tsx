import { type ReactNode } from 'react'
import BasketHeader from '../basketHeader/BasketHeader'
import BasketFooter from '../basketFooter/BasketFooter'
import BasketClearString from '../BasketClearString'
import styles from './BasketBox.module.scss'

const BasketBox = ({ children }: { children: ReactNode }) => (
  <section className={styles['basket-box']}>
    <BasketClearString />
    <BasketHeader />
    {children}
    <BasketFooter />
  </section>
)

export default BasketBox
