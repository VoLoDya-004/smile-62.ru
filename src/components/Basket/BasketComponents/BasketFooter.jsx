import { memo } from "react"
import { useSelector } from "react-redux"


export default memo(function BasketFooter() {
    const priceFormatter = new Intl.NumberFormat()

    const totalBasket = useSelector((state) => state.basket.total)
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)


    return (                          
        <div className={`basketBox__footer ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="basketBox__footer_title">{totalBasket.count} шт.</div>
            <div>{priceFormatter.format(totalBasket.price_total)}  руб.</div>
        </div>
    )
})