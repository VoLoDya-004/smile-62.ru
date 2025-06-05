import { NavLink } from "react-router-dom"
import loadCards from "../../../JS/pagination"


export default function LogoFooter() {

    
    return (
        <NavLink to="/" onClick={{loadCards}}>
            <div className="logo__footer"><img src="/src/assets/images/icons/magazin.png" alt="картинка"/></div>
        </NavLink>
    )
}