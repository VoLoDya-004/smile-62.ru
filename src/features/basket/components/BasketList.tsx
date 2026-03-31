import { useUIContextModals } from '@/shared/providers/UIProvider'
import { useBasket } from '../hooks/useBasket'
import BasketProducts from './basketProducts/BasketProducts'
import type { IBasket } from '../types/basketTypes'

const BasketList = ({ initialBasket = [] }: { initialBasket?: IBasket[] }) => {
  const { cartBasket, handleCountChange, decreaseBasket, increaseBasket } = useBasket()
  const { showModal } = useUIContextModals()

  const displayBasket = initialBasket.length > 0 ? initialBasket : cartBasket

  return (
    <>
      {displayBasket.map((productBasket: IBasket) => (
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