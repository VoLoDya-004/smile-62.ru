import { useBasketContext } from '@/features/basket/contexts/BasketContext'
import { useUIContextModals } from '@/shared/contexts/UIContext'
import Button from '@/shared/ui/buttons/Button'
import styles from './Basket.module.scss'

const BasketClearString = () => {
  const { loadingDeleteAllBasket } = useBasketContext()
  const { handleClearBasketBtn } = useUIContextModals()

  return (
    <section className='clear-string'>
      {loadingDeleteAllBasket ? (
        <div className='spinner-clear-box'>
          <h2 className='spinner-clear-box-title'>Удаление товаров...</h2>
          <div className='spinner-clear'></div>
        </div>
      ) : (
        <>
          <h2 className={styles['basket-box__title']}>Корзина товаров</h2>
          <Button className='button-violet' onClick={handleClearBasketBtn}>
            Очистить корзину
          </Button>                        
        </>
      )}
    </section>
  )
}

export default BasketClearString