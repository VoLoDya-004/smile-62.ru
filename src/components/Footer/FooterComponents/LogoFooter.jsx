import { NavLink } from "react-router-dom"


export default function LogoFooter() {

    
    return (
        <NavLink to="/">
            <div className="logo__footer"><img src="/src/assets/images/icons/magazin.png" alt="картинка"/></div>
        </NavLink>
    )
}