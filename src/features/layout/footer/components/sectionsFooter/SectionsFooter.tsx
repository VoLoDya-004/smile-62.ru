import { NavLink } from 'react-router-dom'
import FooterTitle from '../titleFooter/TitleFooter'
import styles from './SectionsFooter.module.scss'
import type { RootStore } from '@/shared/store'
import { useSelector } from 'react-redux'

const SectionsFooter = () => {
  const {
    'section': section,
    'section__item': sectionItem,
    'section__item-link': sectionItemLink
  } = styles

  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)

	return (
		<nav className={section} aria-label='Навигация по разделам сайта'>
			<FooterTitle>Разделы</FooterTitle>
			<ul className='margin-null' aria-label='Навигация по разделам сайта'>
				<li className={sectionItem}>
					<NavLink to='/' className={sectionItemLink}>Главная</NavLink>			
				</li>
				<li className={sectionItem}>
					<NavLink to='/profile' className={sectionItemLink}>Профиль</NavLink>
				</li>
        {isAdmin && (
				  <li className={sectionItem}>
				  	<NavLink to='/admin' className={sectionItemLink}>Админ</NavLink>
				  </li>
        )}
				<li className={sectionItem}>
					<NavLink to='/favourites' className={sectionItemLink}>Избранное</NavLink>
				</li>
				<li className={sectionItem}>
					<NavLink to='/basket'className={sectionItemLink}>Корзина</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default SectionsFooter