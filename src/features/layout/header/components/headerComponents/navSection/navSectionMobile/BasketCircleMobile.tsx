import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import styles from '../NavSection.module.scss'

const BasketCircleMobile = () => {
  const totalBasket = useSelector((state: RootStore) => state.basket.total)

  const [isVisibleCircle, setIsVisibleCircle] = useState(totalBasket.count > 0)

  useEffect(() => {
    if (totalBasket && typeof totalBasket.count === 'number') {
      setIsVisibleCircle(totalBasket.count > 0)
    }
  }, [totalBasket])

  return (
    <>
      {isVisibleCircle && (
        <span
          className={styles['circle-mobile']}
          style={{marginTop: totalBasket.count > 0 ? '-17px' : '0px'}}
        >
          {totalBasket.count}
        </span>
      )}
    </>
  )
}

export default BasketCircleMobile