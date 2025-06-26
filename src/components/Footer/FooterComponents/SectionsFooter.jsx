import { NavLink } from "react-router-dom"


export default function SectionsFooter() {
	if (document.body.classList.contains("dark-theme") === true) {

	return (
        <div className="section">
		<ul style={{margin: "0"}}>
			<div className="footer__title">Разделы</div>
				<li className="section__item">
					<NavLink to="/" className="section__item_style dark-theme">Главная</NavLink>			
				</li>
				<li className="section__item">
					<NavLink to="/favourites" className="section__item_style dark-theme">Избранное</NavLink>
				</li>
				<li className="section__item">
					<NavLink to="/profile" className="section__item_style dark-theme">Профиль</NavLink>
				</li>
				<li className="section__item">
					<NavLink to="/basket" className="section__item_style dark-theme">Корзина</NavLink>
				</li>
		</ul>
		</div>
    )} else {

		return (
			<div className="section">
			<ul style={{margin: "0"}}>
				<div className="footer__title">Разделы</div>
					<li className="section__item">
						<NavLink to="/" className="section__item_style">Главная</NavLink>			
					</li>
					<li className="section__item">
						<NavLink to="/favourites" className="section__item_style">Избранное</NavLink>
					</li>
					<li className="section__item">
						<NavLink to="/profile" className="section__item_style">Профиль</NavLink>
					</li>
					<li className="section__item">
						<NavLink to="/basket" className="section__item_style">Корзина</NavLink>
					</li>
			</ul>
			</div>
		)
	}
}