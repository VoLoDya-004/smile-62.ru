import { NavLink } from "react-router-dom"


const LogoFooter = () => {

    
    return (
        <NavLink to="/">
            <div className="logo__footer">
                <img src="/images/icons/magazin.png" alt="image"/>
            </div>
        </NavLink>
    )
}

export default LogoFooter