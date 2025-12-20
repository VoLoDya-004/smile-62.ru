import { useBasketContext } from '@/features/basket/contexts/BasketContext'
import { useUIContextModals } from '@/shared/contexts/UIContext'
import BasketProducts from './basketTable/BasketProducts'

const BasketList = () => {
  const { cartBasket, handleCountChange, deletingBasket } = useBasketContext()

  const { showModal } = useUIContextModals()

  return (
    <>
      {cartBasket.map((productBasket) => (
        <BasketProducts 
          productBasket={productBasket} 
          key={productBasket.id} 
          openDeleteModal={() => showModal(productBasket.id)} 
          onChange={handleCountChange}
          isDeleting={deletingBasket.has(productBasket.id)}
        />
      ))}
    </>
  )
}

export default BasketList