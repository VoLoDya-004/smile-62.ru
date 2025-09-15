import type { JSX } from "react"
import { NavLink } from "react-router-dom"


const ButtonMainNav = (): JSX.Element => {
    
    
    return (
        <NavLink to="/"><button id="main"><b style={{userSelect: "none"}}>Перейти на главную</b></button></NavLink>
    )
}

export default ButtonMainNav