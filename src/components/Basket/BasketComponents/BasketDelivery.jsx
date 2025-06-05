import ButtonRegistration from "../../Button/ButtonRegistration"


export default function BasketDelivery({totalBasket}) {
    const priceFormatter = new Intl.NumberFormat()

    return (
        <section className="basketDelivery">
            <div className="basketDelivery__left">
                <div className="basketDelivery__left_count"><b>ВСЕГО ТОВАРОВ:</b> {totalBasket.count} шт.</div>
                <div className="basketDelivery__left_priceTotal"><b>ИТОГО:</b> {priceFormatter.format(totalBasket.price_total)} &#x20bd;</div>
                <div className="basketDelivery__left_btn">
                    <ButtonRegistration text={"Заказать"} />
                </div>
                <div className="basketDelivery__left_checkbox">
                    <input type="checkbox" id="checkbox1" />
                    <label htmlFor="checkbox1">
                        Соглашаюсь с правилами пользования <br /> 
                        <span style={{paddingLeft: "20px"}}>торговой площадкой и возврата</span>
                    </label>
                </div>
            </div>
            <div className="basketDelivery__right">
                <label className="basketDelivery__right_text" for="citySelect"><b>ВАШ ГОРОД </b></label><br />
                <select className="basketDelivery__right_select" 
                name="city" id="citySelect">
                        <option value="">Выберите город</option>
                        <option value="astrahan">Астрахань</option>
                        <option value="barnaul">Барнаул</option>
                        <option value="voronezh">Воронеж</option>
                        <option value="volgograd">Волгоград</option>
                        <option value="izhevsk">Ижевск</option>
                        <option value="kursk">Курск</option>
                        <option value="moscow">Москва</option>
                        <option value="novosibirsk">Новосибирск</option>
                        <option value="ryazan">Рязань</option>
                        <option value="ekaterenburg">Екатеринбург</option>
                        <option value="kazan">Казань</option>
                        <option value="chelyabinsk">Челябинск</option>
                        <option value="omsk">Омск</option>
                        <option value="samara">Самара</option>
                        <option value="ivanovo">Иваново</option>
                        <option value="kaliningrad">Калининград</option>
                        <option value="rostov">Ростов-на-Дону</option>
                        <option value="ufa">Уфа</option>
                        <option value="krasnoyarsk">Красноярск</option>
                        <option value="perm">Пермь</option>
                        <option value="penza">Пенза</option>
                        <option value="tambov">Тамбов</option>
                        <option value="tula">Тула</option>
                        <option value="habarovsk">Хабаровск</option>
                        <option value="mahachkala">Махачкала</option>
                        <option value="orenburg">Оренбург</option>
                        <option value="cheboksar">Чебоксары</option>
                        <option value="oryol">Орел</option>
                        <option value="sochi">Сочи</option>
                </select>
            </div>           
        </section>
    )
}