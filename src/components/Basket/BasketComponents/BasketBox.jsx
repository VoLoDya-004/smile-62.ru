import { memo, useContext, useState } from "react"
import { Context } from "../../../JS/context"
import BasketHeader from "./BasketHeader"
import BasketFooter from "./BasketFooter"
import ButtonRegistration from "../../Button/ButtonRegistration"


export default memo(function BasketBox({totalBasket, productsBasket}) {
    const context = useContext(Context)
    const {handleClearBasket} = context

    const [loading, setLoading] = useState(false)

    const handleClear = () => {
        setLoading(true)
        handleClearBasket()
         .finnaly(() => {
            setLoading(false)
         })
    }

    
    return (
        <section className="basketBox">
            <div className="basketBox__header">
                <div className="basketBox__container">
                    <div className="clearString">
                        {loading ? (
                        <div className="spinnerClearBox">
                            <h1 style={{paddingRight: "10px"}}>Удаление товаров...</h1>
                            <div class="spinnerClear"></div>
                        </div>
                        ) : 
                        (
                        <>
                            <h1 className="basketBox__container_title1">Корзина товаров</h1>
                            <ButtonRegistration onClick={handleClear} id="clearBasketBtn">Очистить корзину</ButtonRegistration>                        
                        </>
                        )}
                    </div>
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


