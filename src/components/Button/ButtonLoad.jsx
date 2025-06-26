import { memo } from "react"


export default memo(function ButtonLoad({onClick, children, id, className}) {

    
    return (
            <button id={id} className={className} onClick={onClick}>
                {children}
            </button>
    )
})