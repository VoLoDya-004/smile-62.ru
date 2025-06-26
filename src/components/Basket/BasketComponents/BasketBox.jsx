import { memo } from "react"
import BasketHeader from "./BasketHeader"
import BasketFooter from "./BasketFooter"


export default memo(function BasketBox({totalBasket, productsBasket}) {

    
    return (
        <section className="basketBox">
            <div className="basketBox__header">
                <div className="basketBox__container">
                    <h1 className="basketBox__container_title1">Корзина товаров</h1>
            <div className="basketBox__body">
                <div className="basketBox__body_container">
                    <section className="basketBox__table">
                        <BasketHeader />
                        {productsBasket}
                        <BasketFooter totalBasket={totalBasket} />
                    </section>
                </div>
            </div>
                </div>
            </div>
        </section>
    )
})


