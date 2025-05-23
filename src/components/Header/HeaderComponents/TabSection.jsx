import { NavLink } from "react-router-dom"
import { useEffect } from "react"

export default function TabSection({}) {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	

    return (
        <ul className="menu">
            <li className="menu__item">
				<NavLink to="/" className={({ isActive }) =>(isActive ? "line line-text menu__item_style" : "menu__item_style")}>Главная</NavLink>
			</li>    
            <li className="menu__item">
				<NavLink to="/favourites" className={({ isActive }) =>(isActive ? "line line-text menu__item_style" : "menu__item_style")}>Избранное</NavLink>
			</li>
			<li className="menu__item">
				  <NavLink to="/profile"className={({ isActive }) =>(isActive ? "line line-text menu__item_style" : "menu__item_style")}>Профиль</NavLink>
			</li>
  	    	<li className="menu__item">
				  <NavLink to="/basket" className={({ isActive }) =>(isActive ? "line line-text menu__item_style" : "menu__item_style")}>Корзина<span className="circle" id="circle">0</span></NavLink>
			</li>
        </ul>

    )
}