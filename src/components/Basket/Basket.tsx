import { useState, useEffect, memo, type JSX } from 'react'
import BlockEmpty from '@/components/sub-components/BlockEmpty'
import BasketBox from '@/components/Basket/BasketComponents/BasketTable/BasketBox'
import BasketDelivery from '@/components/Basket/BasketComponents/BasketDelivery/BasketDelivery'
import Recommendations from '@/components/sub-components/Recommendations'


interface IBasketProps {
  productsBasket: JSX.Element[]
  loading: boolean
}


const Basket = ({ productsBasket, loading }: IBasketProps) => {
  const [visible, setVisible] = useState(productsBasket.length > 0)

  useEffect(() => {
    if (!loading) {
      setVisible(productsBasket.length > 0)
    }
  }, [productsBasket, loading])

  if (loading) {
    return (
      <>
        <h2 className='centered-heading'>Загрузка товаров...</h2>
        <div className='spinner-cards'></div>
      </>
    )
  }


  return (
    <>
      {!visible &&
        <BlockEmpty 
          textUp={'В корзине пока пусто'} 
          textDown={'Загляните на главную — собрали там товары, которые могут вам понравиться'} 
        />
      }
      {visible &&
        <>
          <BasketBox productsBasket={productsBasket} />
          <BasketDelivery />
        </>
      }
      <Recommendations />
    </>
  )
}

export default memo(Basket)
