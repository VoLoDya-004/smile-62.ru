import { NavLink } from "react-router-dom"
import loadCards from "../../JS/pagination"


export default function ButtonMainNav() {
    
    
    return (
        <NavLink to="/" onClick={{loadCards}}><button id="main"><b>Перейти на главную</b></button></NavLink>
    )
}