import { useState, useEffect, memo, type JSX } from 'react'
import BlockEmpty from '../sub-components/BlockEmpty'
import BasketBox from './BasketComponents/BasketTable/BasketBox'
import BasketDelivery from './BasketComponents/BasketDelivery/BasketDelivery'
import Recommendations from '../sub-components/Recommendations'


interface IBasketProps {
    productsBasket: JSX.Element[]
    loading: boolean
}


const Basket = ({productsBasket, loading}: IBasketProps) => {
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
            <section className='basket'>
                <BlockEmpty 
                    text1={'В корзине пока пусто'} 
                    text2={'Загляните на главную — собрали там товары, которые могут вам понравиться'} 
                />
            </section>
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