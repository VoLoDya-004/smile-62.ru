import { useUIContextModals } from '@/shared/providers/UIProvider'
import Button from '@/shared/ui/buttons/Button'
import styles from './Basket.module.scss'

const BasketClearString = () => {
  const { handleClearBasketBtn } = useUIContextModals()

  return (
    <section className='clear-string'>
      <h1 className={styles['basket-box__title']}>Корзина товаров</h1>
      <Button className='button-violet' onClick={handleClearBasketBtn}>Очистить корзину</Button>                        
    </section>
  )
}

export default BasketClearString