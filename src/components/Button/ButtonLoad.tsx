import { memo } from "react"


interface IButtonLoadProps {
    onClick: () => void
    children: React.ReactNode
    id: string
    className: string
    style?: React.CSSProperties
}


const ButtonLoad = ({onClick, children, id, className, style}: IButtonLoadProps) => {

    
    return (
            <button id={id} className={className} onClick={onClick} style={style}>
                {children}
            </button>
    )
}

export default memo(ButtonLoad)