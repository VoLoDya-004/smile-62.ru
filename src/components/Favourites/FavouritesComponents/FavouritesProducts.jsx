import ButtonDeleteFavourites from "../../Button/ButtonDeleteFavourites"
import ButtonBasket from "../../Button/ButtonBasket"


export default function FavouritesProducts( {productFavourites, 
    deleteProductFavourites, addInBasketProductFavourites} ) {
    const {id, nazvanie, image, price_total} = productFavourites

    const priceFormatter = new Intl.NumberFormat()


    return (
        <div className="favouritesBox__product">
            <div className="favouritesBox__product_img">
                <img className="favouritesBox__product_img" 
                src={image} alt="image" />
            </div>
            <div className="favouritesBox__product_title">{nazvanie}</div>
            <div className="favouritesBox__product_price">{priceFormatter.format(price_total)} руб.</div>           
            <ButtonBasket addInBasketProductFavourites={addInBasketProductFavourites} id={id} />
            <ButtonDeleteFavourites deleteProductFavourites={deleteProductFavourites} id={id} />
        </div> 
    )
}