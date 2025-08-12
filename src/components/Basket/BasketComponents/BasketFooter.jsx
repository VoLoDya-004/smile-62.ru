import { memo } from "react"
import { useSelector } from "react-redux"


export default memo(function BasketFooter() {
    const priceFormatter = new Intl.NumberFormat()

    const totalBasket = useSelector((state) => state.basket.total)


    return (                          
        <div className="basketBox__footer">
            <div className="basketBox__footer_title">{totalBasket.count} шт.</div>
            <div>{priceFormatter.format(totalBasket.price_total)}  руб.</div>
        </div>
    )
})