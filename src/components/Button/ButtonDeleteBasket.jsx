import { memo } from "react"


export default memo(function ButtonDeleteBasket({deleteProductBasket, id, isPendingDelete}) {

    const handleDeleteClick = () => {
        deleteProductBasket(id)
    }

    return (
        <div className="basketBox__product_controls">
            { isPendingDelete ? (
                <div class="spinnerBasket"></div>  
            ) : (
            <button type="button" className="basketBox__product_controls"
            disabled={isPendingDelete}
                onClick={handleDeleteClick}>
                <svg className="cross-svg-hover" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path className="cross-svg" d="M18 6L6 18" />
                    <path className="cross-svg" d="M6 6L18 18" />
                </svg>
            </button>
            )}
        </div>
    )
})
