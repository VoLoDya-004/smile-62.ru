// import ButtonDelete from "../../Button/ButtonDelete";


// export default function BasketProducts({product, deleteProduct, increase, decrease, changeValue}) {
//     const {img, title, priceTotal, count, id} = product;

//     const priceFormatter = new Intl.NumberFormat()

    
//     return (
//         <div className="basketBox__product">
//             <div className="basketBox__product_img">
//                 <img className="basketBox__product_img" 
//                 src={`/src/assets/images/tovar/${img}`} alt={title} />
//             </div>
//             <div className="basketBox__product_title">{title}</div>
//             <div className="basketBox__product_count">
//                 <div className="basketBox__product_count-box">
//                     <input onChange={(e)=>{changeValue(id, +e.target.value)}} className="basketBox__product_count-input" 
//                     type="number" min="1" max="100" value={count} />
//                 </div>
//                 <div className="basketBox__product_count-controls">
//                     <button onClick={()=>{increase(id)}} type="button" className="count__up count-svg-hover">
//                         <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path className="count-svg" d="M13 7L7 1L1 7" />
//                         </svg>
//                     </button>
//                     <button onClick={()=>{decrease(id)}} type="button" className="count__down count-svg-hover">
//                         <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path className="count-svg" d="M1 1L7 7L13 1" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             <div className="basketBox__product_price">{priceFormatter.format(priceTotal)} руб.</div>           
//             <ButtonDelete deleteProduct={deleteProduct} id={id} />
//         </div> 
//     )
// }




import { useState } from "react";
import ButtonDeleteBasket from "../../Button/ButtonDeleteBasket";


export default function BasketProducts({productBasket, deleteProductBasket, increaseBasket, decreaseBasket}) {
    const {id, nazvanie, image, count,price_total} = productBasket;
    const priceFormatter = new Intl.NumberFormat()

    const [value, setValue] = useState(1)
    const onChange = event => setValue(+event.target.value)

    
    return (
        <div className="basketBox__product">
            <div className="basketBox__product_img">
                <img className="basketBox__product_img" 
                src= {image} alt="image" />
            </div>
            <div className="basketBox__product_title">{nazvanie}</div>
            <div className="basketBox__product_count">
                <div className="basketBox__product_count-box">
                    <input onChange={onChange} className="basketBox__product_count-input" 
                    type="number" min="1" max="100" value={count} />
                </div>
                <div className="basketBox__product_count-controls">
                    <button onClick={()=>{increaseBasket(id)}} type="button" className="count__up count-svg-hover">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="count-svg" d="M13 7L7 1L1 7" />
                        </svg>
                    </button>
                    <button onClick={()=>{decreaseBasket(id)}} type="button" className="count__down count-svg-hover">
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
}