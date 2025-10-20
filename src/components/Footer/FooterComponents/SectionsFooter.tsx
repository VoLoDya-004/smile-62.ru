import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import type { RootStore } from '../../../redux'


const SectionsFooter = () => {
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


	return (
		<nav 
			className='footer__section'
			aria-label='Навигация по разделам сайта'
		>
			<h3 className='footer__title footer__title-section'>Разделы</h3>
			<ul 
				className='margin-null' 
				aria-label='Навигация по разделам сайта'
			>
				<li className='footer__section-item'>
					<NavLink 
						to='/'
						className={`footer__section-item-style ${isDarkTheme ? 'dark-theme' : ''}`}
					>
						Главная
					</NavLink>			
				</li>
				<li className='footer__section-item'>
					<NavLink 
						to='/favourites' 
						className={`footer__section-item-style ${isDarkTheme ? 'dark-theme' : ''}`}
					>
						Избранное
					</NavLink>
				</li>
				<li className='footer__section-item'>
					<NavLink 
						to='/profile' 
						className={`footer__section-item-style ${isDarkTheme ? 'dark-theme' : ''}`}
					>
						Профиль
					</NavLink>
				</li>
				<li className='footer__section-item'>
					<NavLink 
						to='/basket'
						className={`footer__section-item-style ${isDarkTheme ? 'dark-theme' : ''}`}
					>
						Корзина
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default SectionsFooter