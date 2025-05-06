import { NavLink } from "react-router-dom"
import {obnovylle} from "../../JS/pagination"

export default function ButtonBasket() {
    
    return (
        <NavLink to="/"><button id="main" onClick={obnovylle}><b>Перейти на главную</b></button></NavLink>
    )
}