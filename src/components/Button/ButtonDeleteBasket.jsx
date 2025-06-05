


export default function ButtonDeleteBasket({deleteProductBasket, id}) {


    return(
        <div className="basketBox__product_controls">
            <button type="button" className="basketBox__product_controls" onClick={()=>{deleteProductBasket(id)}}>
                <svg className="cross-svg-hover" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path className="cross-svg" d="M18 6L6 18" />
                    <path className="cross-svg" d="M6 6L18 18" />
                </svg>
            </button>
        </div>
    )
}