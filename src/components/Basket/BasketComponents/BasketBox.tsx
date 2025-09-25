import { memo, useContext, type JSX } from 'react'
import { Context } from '../../../contexts/context'
import BasketHeader from './BasketHeader'
import BasketFooter from './BasketFooter'
import Button from '../../Button/Button'


interface IBasketBoxProps {
    productsBasket: JSX.Element[]
}


const BasketBox = ({productsBasket}: IBasketBoxProps) => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const {handleClearBasketBtn, loadingDeleteAllBasket} = context

    
    return (
        <section className='basket-box'>
            <div className='basket-box__header'>
                <div className='basket-box__container'>
                    <div className='clear-string'>
                        {loadingDeleteAllBasket ? (
                        <div className='spinner-clear-box'>
                            <h1 className='spinner-clear-box-title'>Удаление товаров...</h1>
                            <div className='spinner-clear'></div>
                        </div>
                        ) : 
                        (
                        <>
                            <h1 className='basket-box__container-title1'>Корзина товаров</h1>
                            <Button 
                                className='button-violet'
                                onClick={handleClearBasketBtn} 
                            >
                                Очистить корзину
                            </Button>                        
                        </>
                        )}
                    </div>
            <div className='basket-box__body'>
                <div className='basket-box__body-container'>
                    <section className='basket-box__table'>
                        <BasketHeader />
                        {productsBasket}
                        <BasketFooter />
                    </section>
                </div>
            </div>
                </div>
            </div>
        </section>
    )
}

export default memo(BasketBox)


