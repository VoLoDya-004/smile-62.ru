import ButtonDeleteBasket from "../../Button/ButtonDeleteBasket"
import { memo } from "react"
const priceFormatter = new Intl.NumberFormat()


export default memo(function BasketProducts({productBasket, deleteProductBasket, increaseBasket, 
    decreaseBasket, onChange}) {
    const {id, nazvanie, image, count, price_total} = productBasket;

    
    return (
        <div className="basketBox__product">
            <div className="basketBox__product_img">
                <img className="basketBox__product_img" 
                src= {image} alt="image" />
            </div>
            <div className="basketBox__product_title">{nazvanie}</div>
            <div className="basketBox__product_count">
                <div className="basketBox__product_count-box">
                    <input onChange={(e) => onChange(e, id)} 
                    className="basketBox__product_count-input" 
                    type="number" min="1" max="100" value={count} />
                </div>
                <div className="basketBox__product_count-controls">
                    <button onClick={()=>
                        {increaseBasket(id, count)}} type="button" 
                        className="count__up count-svg-hover">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="count-svg" d="M13 7L7 1L1 7" />
                        </svg>
                    </button>
                    <button onClick={()=>
                        {decreaseBasket(id, count)}} type="button" 
                        className="count__down count-svg-hover">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="count-svg" d="M1 1L7 7L13 1" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="basketBox__product_price">{priceFormatter.format(price_total * count)} руб.</div>           
            <ButtonDeleteBasket deleteProductBasket={deleteProductBasket} id={id} /> 
        </div> 
    )
})
