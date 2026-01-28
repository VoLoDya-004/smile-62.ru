import { useUIContextModals } from '@/shared/providers/UIProvider'
import { useBasket } from '../../hooks/useBasket'
import type { IBasket } from '../../types/basketTypes'
import BasketProducts from './BasketProducts'

const BasketList = () => {
  const { cartBasket, handleCountChange, decreaseBasket, increaseBasket } = useBasket()
  const { showModal } = useUIContextModals()

  return (
    <>
      {cartBasket.map((productBasket: IBasket) => (
        <BasketProducts 
          productBasket={productBasket} 
          key={productBasket.id} 
          openDeleteModal={() => showModal(productBasket.id)} 
          onChange={handleCountChange}
          decreaseBasket={decreaseBasket}
          increaseBasket={increaseBasket}
        />
      ))}
    </>
  )
}

export default BasketList