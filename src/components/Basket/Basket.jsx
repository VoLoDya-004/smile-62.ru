import { useState, useEffect } from "react"
import BlockEmpty from "../sub-components/BlockEmpty"
import BasketBox from "./BasketComponents/BasketBox"
import BasketDelivery from "./BasketComponents/BasketDelivery"
import Recommendations from "../sub-components/Recommendations"

export default function Basket({totalBasket, productsBasket}) {
    const [visible, setVisible] = useState(productsBasket.length > 0)

    useEffect(() => {
        setVisible(productsBasket.length > 0)
    }, [productsBasket])
    
    return (
        <>
            {!visible &&
            <section className="basket">
                <BlockEmpty text1={"В корзине пока пусто"} 
                text2={"Загляните на главную — собрали там товары, которые могут вам понравиться"} />
            </section>
            }
            {visible &&
            <>
                <BasketBox productsBasket={productsBasket} totalBasket={totalBasket} />
                <div className="delivery-label"><b>Доставка</b></div>
                <BasketDelivery totalBasket={totalBasket} />
            </>
            }
            <Recommendations />
        </>
    )
}