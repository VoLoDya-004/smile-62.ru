import { type JSX } from 'react'
import BlockEmpty from '@/components/sub-components/BlockEmpty'
import BasketBox from '@/components/Basket/BasketComponents/BasketTable/BasketBox'
import BasketDelivery from '@/components/Basket/BasketComponents/BasketDelivery/BasketDelivery'
import Recommendations from '@/components/sub-components/Recommendations'

interface IBasketProps {
  productsBasket: JSX.Element[]
  loading: boolean
}

const Basket = ({ productsBasket, loading }: IBasketProps) => {
  if (loading) {
    return (
      <>
        <h2 className='centered-heading'>Загрузка товаров...</h2>
        <div className='spinner-cards'></div>
      </>
    )
  }

  const hasBasket = productsBasket.length > 0

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
          <BasketBox productsBasket={productsBasket} />
          <BasketDelivery />
        </>
      }
      <Recommendations />
    </>
  )
}

export default Basket
