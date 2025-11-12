import { useContext } from 'react'
import { Context } from '../../../contexts/context'
import Button from '../../Button/Button'



const BasketClearString = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const {handleClearBasketBtn, loadingDeleteAllBasket} = context


  return (
    <section className='clear-string'>
      {loadingDeleteAllBasket ? (
      <div className='spinner-clear-box'>
        <h2 className='spinner-clear-box-title'>Удаление товаров...</h2>
        <div className='spinner-clear'></div>
      </div>
      ) : 
      (
      <>
        <h2 className='basket-box__title'>Корзина товаров</h2>
        <Button 
          className='button-violet'
          onClick={handleClearBasketBtn} 
        >
          Очистить корзину
        </Button>                        
      </>
      )}
    </section>
  )
}

export default BasketClearString