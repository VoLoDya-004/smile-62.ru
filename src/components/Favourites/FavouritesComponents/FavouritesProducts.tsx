import ButtonDeleteFavourites from "../../Button/ButtonDeleteFavourites"
import ButtonBasket from "../../Button/ButtonBasket"
import { memo, type JSX } from "react"
import type { IFav, IBasket } from "../../../types/types"


interface IFavouritesProductsProps {
    productFavourites: IFav
    deleteProductFavourites: (id: number) => void
    cartBasket: IBasket[]
    addInBasketProductFavourites: (id: number) => void
    cartFavourites: IFav[]
}


const FavouritesProducts = ({productFavourites, deleteProductFavourites, cartBasket,
    addInBasketProductFavourites, cartFavourites}: IFavouritesProductsProps): JSX.Element => {

    const {id, nazvanie, image, price_total} = productFavourites

    const priceFormatter = new Intl.NumberFormat()


    return (
        <div className="favouritesBox__product" id={String(productFavourites.id)}>
            <div className="favouritesBox__product_img">
                <img className="favouritesBox__product_img" 
                src={image} alt="image" />
            </div>
            <div className="favouritesBox__product_title">{nazvanie}</div>
            <div className="favouritesBox__product_price">{priceFormatter.format(price_total)} руб.</div>           
            <ButtonBasket 
                cartFavourites={cartFavourites} 
                productFavourites={productFavourites} 
                addInBasketProductFavourites={addInBasketProductFavourites} 
                id={id} 
                cartBasket={cartBasket} 
            />
            <ButtonDeleteFavourites 
                deleteProductFavourites={deleteProductFavourites} 
                id={id} 
            />
        </div> 
    )
}

export default memo(FavouritesProducts)