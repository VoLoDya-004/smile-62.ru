import ButtonDelete from "../../Button/ButtonDelete";


export default function BasketProducts({product, deleteProduct, increase, decrease, changeValue}) {
    const {img, title, priceTotal, count, id} = product;

    const priceFormatter = new Intl.NumberFormat()

    return (
        <div className="basketBox__product">
            <div className="basketBox__product_img">
                <img className="basketBox__product_img" 
                src={`/src/assets/images/tovar/${img}`} alt={title} />
            </div>
            <div className="basketBox__product_title">{title}</div>
            <div className="basketBox__product_count">
                <div className="basketBox__product_count-box">
                    <input onChange={(e)=>{changeValue(id, +e.target.value)}} className="basketBox__product_count-input" 
                    type="number" min="1" max="100" value={count} />
                </div>
                <div className="basketBox__product_count-controls">
                    <button onClick={()=>{increase(id)}} type="button" className="count__up count-svg-hover">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="count-svg" d="M13 7L7 1L1 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button onClick={()=>{decrease(id)}} type="button" className="count__down count-svg-hover">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="count-svg" d="M1 1L7 7L13 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="basketBox__product_price">{priceFormatter.format(priceTotal)} руб.</div>           
            <ButtonDelete deleteProduct={deleteProduct} id={id} />
        </div> 
    )
}