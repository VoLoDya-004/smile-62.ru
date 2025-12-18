import { type ReactNode } from 'react'
import { useBasketContext } from '@/contexts/BasketContext'
import BlockEmpty from '@/components/sub-components/BlockEmpty'
import BasketBox from '@/components/Basket/BasketComponents/BasketTable/BasketBox'
import BasketDelivery from '@/components/Basket/BasketComponents/BasketDelivery/BasketDelivery'
import Recommendations from '@/components/sub-components/Recommendations'

interface IBasketProps {
  children: ReactNode
  loading: boolean
}

const Basket = ({ children, loading }: IBasketProps) => {
  const { cartBasket } = useBasketContext()

  if (loading) {
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
      {!hasBasket &&
        <BlockEmpty 
          textUp={'В корзине пока пусто'} 
          textDown={'Загляните на главную — собрали там товары, которые могут вам понравиться'} 
        />
      }
      {hasBasket &&
        <>
          <BasketBox>{children}</BasketBox>
          <BasketDelivery />
        </>
      }
      <Recommendations />
    </>
  )
}

export default Basket
