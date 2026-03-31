import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { cx } from '@/shared/utils/classnames'
import BasketCircleMobile from './circleBasket/BasketCircleMobile'
import styles from './NavSectionMobile.module.scss'
import AdminSVG from '@/shared/ui/icons/NavMobileSVG/AdminSVG'
import BasketSVG from '@/shared/ui/icons/NavMobileSVG/BasketSVG'
import ProfileSVG from '@/shared/ui/icons/NavMobileSVG/ProfileSVG'
import FavouritesSVG from '@/shared/ui/icons/NavMobileSVG/FavouritesSVG'
import HomeSVG from '@/shared/ui/icons/NavMobileSVG/HomeSVG'

const NavSectionMobile = () => {  
  const {
    'header-nav': nav,
    'header-nav__item': navItem,
    'header-nav__item_active': navItemActive,
    'header-nav__item_passiv': navItemPassiv
  } = styles

  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]) 

  return (
    <nav className={nav} aria-label='Навигация по сайту'>
      <Link 
        href='/' 
        className={cx(pathname === '/' ? navItemActive : navItemPassiv)}
        aria-label='Главная'
      > 
        <div className={navItem}><HomeSVG /></div>
      </Link>
      <Link 
        href='/profile' 
        className={cx(pathname === '/profile' ? navItemActive : navItemPassiv)}
        aria-label='Профиль'
      >
        <div className={navItem}><ProfileSVG /></div>
      </Link>
      {isAdmin && (
        <Link 
          href='/admin' 
          className={cx(pathname === '/admin' ? navItemActive : navItemPassiv)}
          aria-label='Админ'
        >
          <div className={navItem}><AdminSVG /></div>
        </Link>
      )}
      <Link 
        href='/favourites' 
        className={cx(pathname === '/favourites' ? navItemActive : navItemPassiv)}
        aria-label='Избранное'
      >
        <div className={navItem}><FavouritesSVG /></div>
      </Link>
      <Link 
        href='/basket'
        className={cx(pathname === '/basket' ? navItemActive : navItemPassiv)}
        aria-label='Корзина'
      > 
        <BasketCircleMobile />
        <div className={navItem}><BasketSVG /></div>
      </Link>
    </nav>
  )
}

export default NavSectionMobile