import { memo, useContext, type JSX } from "react"
import { Context } from "../../../contexts/context"
import BasketHeader from "./BasketHeader"
import BasketFooter from "./BasketFooter"
import Button from "../../Button/Button"


interface IBasketBoxProps {
    productsBasket: JSX.Element[]
}


const BasketBox = ({productsBasket}: IBasketBoxProps) => {
    const context = useContext(Context)
    if(!context) {
        throw new Error("Context must be used within a Provider")
    }
    const {handleClearBasketBtn, loadingDeleteAllBasket} = context

    
    return (
        <section className="basketBox">
            <div className="basketBox__header">
                <div className="basketBox__container">
                    <div className="clearString">
                        {loadingDeleteAllBasket ? (
                        <div className="spinnerClearBox">
                            <h1 style={{paddingRight: "10px"}}>Удаление товаров...</h1>
                            <div className="spinnerClear"></div>
                        </div>
                        ) : 
                        (
                        <>
                            <h1 className="basketBox__container_title1">Корзина товаров</h1>
                            <Button 
                                onClick={handleClearBasketBtn} 
                                id="clearBasketBtn" 
                                className="form__registration_btn"
                            >
                                Очистить корзину
                            </Button>                        
                        </>
                        )}
                    </div>
            <div className="basketBox__body">
                <div className="basketBox__body_container">
                    <section className="basketBox__table">
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


