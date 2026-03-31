import { useEffect, useState, type ReactNode } from 'react'
import type { RootStore } from '@/shared/store'
import { useBasket } from './hooks/useBasket'
import { useSelector } from 'react-redux'
import BlockEmpty from '@/shared/widgets/blockEmpty/BlockEmpty'
import BasketBox from './components/basketBox/BasketBox'
import Delivery from './components/delivery/Delivery'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'
import { Spinner } from '@/shared/ui/spinner/Spinner'
import Head from 'next/head'
import { IBasket } from './types/basketTypes'
interface IBasketProps {
  children: ReactNode
  loading: boolean
  initialBasket?: IBasket[]
  isAuth?: boolean
}

const Basket = ({ children, loading, initialBasket = [], isAuth: isAuthProp = false }: IBasketProps) => {
  const { cartBasket, isAdding } = useBasket()

  const isAuthRedux = useSelector((state: RootStore) => state.user.isAuth)
  const isAuth = isAuthProp || isAuthRedux

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

  if ((loading && isAuth) || isAdding) return <Spinner />

  const displayBasket = initialBasket.length > 0 ? initialBasket : cartBasket
  const hasBasket = displayBasket.length > 0

  return (
    <>
      <Head>
        <title>Корзина | Smile</title>
        <meta name='description' content='Ваша корзина в магазине Smile и оформление заказа' />
      </Head>
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
