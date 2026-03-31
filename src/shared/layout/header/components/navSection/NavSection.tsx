import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { RootStore } from '@/shared/store'
import { useSelector } from 'react-redux'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import { useAuth } from '@/features/profile/hooks/useAuth'
import { useDeviceType } from '@/shared/hooks'
import HeaderProfileDropdown from './headerProfileDropdown/HeaderProfileDropdown'
import { cx } from '@/shared/utils/classnames'
import styles from './NavSection.module.scss'

const NavSection = () => {
  const {
    'header-nav': nav,
    'header-nav__list': navList,
    'header-nav__item': navItem,
    'header-nav__line': navLine,
    'header-nav__item-link': navItemLink
  } = styles

  const { isMobile } = useDeviceType()
  const { handleLogout, isLoggingOut } = useAuth()
  const { showNotification } = useUIContextNotification()

  const isAuth = useSelector((state: RootStore) => state.user.isAuth)
  const userName = useSelector((state: RootStore) => state.user.userName)
  const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)

  const pathname = usePathname()
  const router = useRouter()
  const isActiveProfile = pathname === '/profile'

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handlePointerEnter = () => {
    if (isMobile) return
    setShowProfileMenu(true)
  }

  const handlePointerLeave = () => {
    setShowProfileMenu(false)
  }

  const handleLogin = () => {
    if (pathname !== '/profile') {
      router.push('/profile')
    }
    showNotification('Войдите или зарегистрируйтесь', 'success')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <nav className={nav} aria-label='Навигация по сайту'>
      <ul className={navList} aria-label='Навигация по сайту'>
        <li className={navItem}>
          <Link
            href='/'
            className={cx(navItemLink, pathname === '/' && navLine)}
          >
            Главная
          </Link>
        </li>
        <li
          className={navItem}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onFocus={() => setShowProfileMenu(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowProfileMenu(false)
            }
          }}
        >
          <Link
            href='/profile'
            className={cx(navItemLink, pathname === '/profile' && navLine)}
            aria-label='Профиль'
          >
            Профиль
          </Link>
          {showProfileMenu && (
            <HeaderProfileDropdown
              isAuth={isAuth}
              userName={userName}
              isActiveProfile={isActiveProfile}
              onLogout={handleLogout}
              onLogin={handleLogin}
              isLoggingOut={isLoggingOut}
            />
          )}
        </li>
        {isAdmin && (
          <li className={navItem}>
            <Link
              href='/admin'
              className={cx(navItemLink, pathname === '/admin' && navLine)}
            >
              Админ
            </Link>
          </li>
        )}
        <li className={navItem}>
          <Link
            href='/favourites'
            className={cx(navItemLink, pathname === '/favourites' && navLine)}
          >
            Избранное
          </Link>
        </li>
        <li className={navItem}>
          <Link
            href='/basket'
            className={cx(navItemLink, pathname === '/basket' && navLine)}
          >
            Корзина
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavSection