import type { MouseEventHandler, ReactNode } from "react"


interface IButtonSubmitProps {
    id?: string
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: ReactNode
}


const ButtonSubmit = ({children, id, className, onClick}: IButtonSubmitProps) => {


    return (
        <p>
			<button type="submit" className={className} id={id} 
            onClick={onClick}><b style={{userSelect: "none"}}>{children}</b></button>
		</p>
    )
}

export default ButtonSubmit