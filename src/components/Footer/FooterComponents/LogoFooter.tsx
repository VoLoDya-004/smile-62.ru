import type { JSX } from "react"
import { NavLink } from "react-router-dom"


const LogoFooter = (): JSX.Element => {

    
    return (
        <NavLink to="/">
            <div className="logo__footer"><img src="/images/icons/magazin.png" alt="картинка"/></div>
        </NavLink>
    )
}

export default LogoFooter