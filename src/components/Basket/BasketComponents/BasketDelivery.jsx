import ButtonMainNav from "../../Button/ButtonMainNav"


export default function BasketDelivery() {
    return (
        <section className="basketDelivery">
            <div className="basketDelivery__left">
                <div className="basketDelivery__left_count"></div>
                <div className="basketDelivery__left_priceTotal"></div>
                <ButtonMainNav />
                <div className="basketDelivery__left">
                    <input type="checkbox" id="checkbox1" />
                    <label htmlFor="checkbox1">
                        Соглашаюсь с правилами пользования <br /> 
                        торговой площадкой и возврата
                    </label>
                </div>
            </div>
            <div className="basketDelivery__right">
                <div className="basketDelivery__right_text"></div>
                <select className="basketDelivery__right_select" name="" id="">
                    
                </select>
            </div>           
        </section>
    )
}