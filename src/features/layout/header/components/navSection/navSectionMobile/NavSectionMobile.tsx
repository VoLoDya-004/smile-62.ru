import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { cx } from '@/shared/utils/classnames'
import BasketCircleMobile from './BasketCircleMobile'
import styles from '../NavSection.module.scss'
import AdminSVG from '@/shared/ui/icons/NavMobileSVG/AdminSVG'
import BasketSVG from '@/shared/ui/icons/NavMobileSVG/BasketSVG'
import ProfileSVG from '@/shared/ui/icons/NavMobileSVG/ProfileSVG'
import FavouritesSVG from '@/shared/ui/icons/NavMobileSVG/FavouritesSVG'
import HomeSVG from '@/shared/ui/icons/NavMobileSVG/HomeSVG'

const NavSectionMobile = () => {  
  const {
    'header-nav-mobile': nav,
    'header-nav-mobile__item': navItem,
    'header-nav-mobile__item_active': navItemActive,
    'header-nav-mobile__item_passiv': navItemPassiv
  } = styles

  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)

  const location = useLocation()    

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location]) 

  return (
    <nav className={nav} aria-label='Навигация по сайту'>
      <NavLink 
        to='/' 
        className={({ isActive }) => cx(isActive ? navItemActive : navItemPassiv)}
        aria-label='Главная'
      > 
        <div className={navItem}><HomeSVG /></div>
      </NavLink>
      <NavLink 
        to='/profile' 
        className={({ isActive }) => cx(isActive ? navItemActive : navItemPassiv)}
        aria-label='Профиль'
      >
        <div className={navItem}><ProfileSVG /></div>
      </NavLink>
      {isAdmin && (
        <NavLink 
          to='/admin' 
          className={({ isActive }) => cx(isActive ? navItemActive : navItemPassiv)}
          aria-label='Админ'
        >
          <div className={navItem}><AdminSVG /></div>
        </NavLink>
      )}
      <NavLink 
        to='/favourites' 
        className={({ isActive }) => cx(isActive ? navItemActive : navItemPassiv)}
        aria-label='Избранное'
      >
        <div className={navItem}><FavouritesSVG /></div>
      </NavLink>
      <NavLink 
        to='/basket'
        className={({ isActive }) => cx(isActive ? navItemActive : navItemPassiv)}
        aria-label='Корзина'
      > 
        <BasketCircleMobile />
        <div className={navItem}><BasketSVG /></div>
      </NavLink>
    </nav>
  )
}

export default NavSectionMobile