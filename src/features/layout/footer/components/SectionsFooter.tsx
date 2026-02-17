import { NavLink } from 'react-router-dom'
import FooterTitle from './FooterTitle'
import styles from '../Footer.module.scss'

const SectionsFooter = () => {
  const {
    'footer__section': section,
    'footer__section-item': sectionItem,
    'footer__section-item-style': sectionItemStyle
  } = styles

	return (
		<nav className={section} aria-label='Навигация по разделам сайта'>
			<FooterTitle>Разделы</FooterTitle>
			<ul className='margin-null' aria-label='Навигация по разделам сайта'>
				<li className={sectionItem}>
					<NavLink to='/' className={sectionItemStyle}>
						Главная
					</NavLink>			
				</li>
				<li className={sectionItem}>
					<NavLink to='/favourites' className={sectionItemStyle}>
						Избранное
					</NavLink>
				</li>
				<li className={sectionItem}>
					<NavLink to='/profile' className={sectionItemStyle}>
						Профиль
					</NavLink>
				</li>
				<li className={sectionItem}>
					<NavLink to='/basket'className={sectionItemStyle}>
						Корзина
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default SectionsFooter