import { useEffect, useState, type ReactNode } from 'react'
import type { RootStore } from '@/shared/store'
import { useBasket } from './hooks/useBasket'
import { useSelector } from 'react-redux'
import BlockEmpty from '@/shared/widgets/blockEmpty/BlockEmpty'
import BasketBox from './components/basket/BasketBox'
import Delivery from './components/delivery/Delivery'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'
interface IBasketProps {
  children: ReactNode
  loading: boolean
}

const Basket = ({ children, loading }: IBasketProps) => {
  const { cartBasket } = useBasket()

  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const [textUpButton, setTextUpButton] = useState('')
  const [textDownButton, setTextDownButton] = useState('')

  useEffect(() => {
    if (isAuth) {
      setTextUpButton('В корзине пока пусто')
      setTextDownButton('Загляните на главную — собрали там товары, которые могут вам понравиться')
    } else {
      setTextUpButton('Войдите в аккаунт')
      setTextDownButton('Для просмотра корзины необходимо войти в аккаунт')
    }
  }, [isAuth])

  if (loading && isAuth) {
    return (
      <>
        <h2 className='centered-heading'>Загрузка товаров...</h2>
        <div className='spinner-cards'></div>
      </>
    )
  }

  const hasBasket = cartBasket.length > 0

  return (
    <>
      {!hasBasket && <BlockEmpty textUp={textUpButton} textDown={textDownButton} /> }
      {hasBasket &&
        <>
          <BasketBox>{children}</BasketBox>
          <Delivery />
        </>
      }
      <Recommendations />
    </>
  )
}

export default Basket
