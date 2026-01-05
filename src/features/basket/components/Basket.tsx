import { type ReactNode } from 'react'
import { useBasketContext } from '@/features/basket/contexts/BasketContext'
import BlockEmpty from '@/shared/widgets/blockEmpty/BlockEmpty'
import BasketBox from './basketComponents/BasketBox'
import Delivery from './delivery/Delivery'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'
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
          <Delivery />
        </>
      }
      <Recommendations />
    </>
  )
}

export default Basket
