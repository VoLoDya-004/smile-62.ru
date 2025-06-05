

export default function BasketFooter({totalBasket}) {
    const priceFormatter = new Intl.NumberFormat()


    return (                          
        <div className="basketBox__footer">
            <div className="basketBox__footer_title">{totalBasket.count} ед.</div>
            <div>{priceFormatter.format(totalBasket.price_total)}  руб.</div>
        </div>
    )
}