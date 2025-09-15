import { memo, type JSX } from "react"
import { useSelector } from "react-redux"
import type { RootStore } from "../../../redux"


const BasketFooter = (): JSX.Element => {
    const priceFormatter = new Intl.NumberFormat()

    const totalBasket = useSelector((state: RootStore) => state.basket.total)
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (                          
        <div className={`basketBox__footer ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="basketBox__footer_title">{totalBasket.count} шт.</div>
            <div>{priceFormatter.format(totalBasket.price_total)}  руб.</div>
        </div>
    )
}

export default memo(BasketFooter)