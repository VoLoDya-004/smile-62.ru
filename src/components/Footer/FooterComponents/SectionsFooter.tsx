import type { JSX } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import type { RootStore } from "../../../redux"


const SectionsFooter = (): JSX.Element => {
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


	return (
		<div className="section">
		<ul style={{margin: "0"}}>
			<div className="footer__title">Разделы</div>
				<li className="section__item">
					<NavLink to="/" 
						className={`section__item_style ${isDarkTheme ? "dark-theme" : ""}`}
					>
						Главная
					</NavLink>			
				</li>
				<li className="section__item">
					<NavLink to="/favourites" 
						className={`section__item_style ${isDarkTheme ? "dark-theme" : ""}`}
					>
						Избранное
					</NavLink>
				</li>
				<li className="section__item">
					<NavLink to="/profile" 
						className={`section__item_style ${isDarkTheme ? "dark-theme" : ""}`}
					>
						Профиль
					</NavLink>
				</li>
				<li className="section__item">
					<NavLink to="/basket"
						className={`section__item_style ${isDarkTheme ? "dark-theme" : ""}`}
					>
						Корзина
					</NavLink>
				</li>
		</ul>
		</div>
	)
}

export default SectionsFooter