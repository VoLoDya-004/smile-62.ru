import ButtonDeleteFavourites from "../../Button/ButtonDeleteFavourites"
import ButtonBasket from "../../Button/ButtonBasket"
import { memo } from "react"


export default memo(function FavouritesProducts( {productFavourites, 
    deleteProductFavourites, addInBasketProductFavourites, cartBasket, cartFavourites} ) {
    const {id, nazvanie, image, price_total} = productFavourites

    const priceFormatter = new Intl.NumberFormat()


    return (
        <div className="favouritesBox__product" id={productFavourites.id}>
            <div className="favouritesBox__product_img">
                <img className="favouritesBox__product_img" 
                src={image} alt="image" />
            </div>
            <div className="favouritesBox__product_title">{nazvanie}</div>
            <div className="favouritesBox__product_price">{priceFormatter.format(price_total)} руб.</div>           
            <ButtonBasket cartFavourites={cartFavourites} productFavourites={productFavourites} addInBasketProductFavourites={addInBasketProductFavourites} id={id} cartBasket={cartBasket} />
            <ButtonDeleteFavourites deleteProductFavourites={deleteProductFavourites} id={id} />
        </div> 
    )
})