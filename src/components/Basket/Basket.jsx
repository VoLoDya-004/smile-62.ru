import BlockEmpty from "../sub-components/BlockEmpty"
import BasketBox from "./BasketComponents/BasketBox"
import BasketDelivery from "./BasketComponents/BasketDelivery"


export default function Basket() {
    return (
        <>
        <section className="basket">
            <BlockEmpty text1={"В корзине пока пусто"} 
            text2={"Загляните на главную — собрали там товары, которые могут вам понравиться"} />
        </section>
        <BasketBox />
        <BasketDelivery />
        </>
    )
}