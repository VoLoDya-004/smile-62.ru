import { useEffect, useState } from 'react'
import { useBasket } from '@/features/basket/hooks/useBasket'
import type { IBasket, IBasketTotal } from '@/features/basket/types/basketTypes'
import styles from './NavSection.module.scss'

const BasketCircle = () => {
  let { cartBasket } = useBasket()

  cartBasket = cartBasket.filter((item: IBasket) => item.id > 0)

  const total = cartBasket.reduce((acc: IBasketTotal, item: IBasket) => {
    const count = Number(item.count)
    acc.count += (isNaN(count) || count <= 0) ? 0 : count
    return acc
  }, { count: 0 })

  const [isVisible, setIsVisible] = useState(total.count > 0)

  useEffect(() => {
    setIsVisible(total.count > 0)
  }, [total])

  return (
    <>  
      {isVisible && 
        <span className={styles.circle}>
          {total.count}
        </span>
      }
    </>
  )
}

export default BasketCircle