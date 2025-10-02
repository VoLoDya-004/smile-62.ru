import { memo } from 'react'
import type { IFav, IBasket } from '../../../types/types'
import ButtonDeleteFavourites from '../../Button/ButtonDeleteFavourites'
import ButtonBasket from '../../Button/ButtonBasket'


interface IFavouritesProductsProps {
    productFavourites: IFav
    deleteProductFavourites: (id: number) => void
    cartBasket: IBasket[]
    addInBasketProductFavourites: (id: number) => Promise<void>
    cartFavourites: IFav[]
}


const FavouritesProducts = ({productFavourites, deleteProductFavourites, cartBasket,
    addInBasketProductFavourites, cartFavourites}: IFavouritesProductsProps) => 
{
    const {id, nazvanie, image, price_total} = productFavourites

    const priceFormatter = new Intl.NumberFormat()


    return (
        <div 
            className='favourites-box__product'
            id={String(productFavourites.id)}
        >
            <div className='favourites-box__product-img'>
                <img 
                    className='favourites-box__product-img' 
                    src={image} 
                    alt='Товар' 
                />
            </div>
            <div className='favourites-box__product-title'>
                {nazvanie}
            </div>
            <div className='favourites-box__product-price'>
                {priceFormatter.format(price_total)} руб.
            </div>           
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