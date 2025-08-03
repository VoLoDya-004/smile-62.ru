import { memo } from "react"


export default memo(function ButtonLoad({onClick, children, id, className, style}) {

    
    return (
            <button id={id} className={className} onClick={onClick} style={style}>
                {children}
            </button>
    )
})