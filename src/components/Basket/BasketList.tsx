import { useBasketContext } from '@/contexts/BasketContext'
import { useUIContextModals } from '@/contexts/UIContext'
import BasketProducts from './BasketComponents/BasketTable/BasketProducts'

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