import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { RootStore } from '@/shared/store'
import { useSelector } from 'react-redux'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import { cx } from '@/shared/utils/classnames'
import { useAuth } from '@/features/profile/hooks/useAuth'
import { useDeviceType } from '@/shared/hooks'
import ProfileMenu from './ProfileMenu'
import styles from './NavSection.module.scss'

const NavSection = () => {
  const {
    'header-nav': nav,
    'header-nav__list': navList,
    'header-nav__item': navItem,
    'header-nav__line': navLine,
    'header-nav__item-style': navItemStyle
  } = styles

	const { isMobile } = useDeviceType()
  const { handleLogout } = useAuth()
  const { showNotification } = useUIContextNotification()

	const isAuth = useSelector((state: RootStore) => state.user.isAuth)
	const userName = useSelector((state: RootStore) => state.user.userName)
	const isAdmin = useSelector((state: RootStore) => state.user.isAdmin)

	const location = useLocation()
	const navigate = useNavigate()
	const isActiveProfile = location.pathname === '/profile'

	const [showProfileMenu, setShowProfileMenu] = useState(false)

	const handlePointerEnter = () => {
		if (isMobile) return
		setShowProfileMenu(true)
	}

	const handlePointerLeave = () => {
		setShowProfileMenu(false)
	}

	const handleLogin = () => {
		if (location.pathname !== '/profile') {
      navigate('/profile')
    }
		showNotification('Войдите или зарегистрируйтесь', 'success')
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<nav
			className={nav}
			aria-label='Навигация по сайту'
		>
			<ul
				className={navList}
				aria-label='Навигация по сайту'
			>
				<li className={navItem}>
					<NavLink
						to='/'
						className={({ isActive }) => cx(navItemStyle, isActive && navLine)}
					>
						Главная
					</NavLink>
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
					<NavLink
						to='/profile'
						className={({ isActive }) => cx(navItemStyle, isActive && navLine)}
						aria-label='Профиль'
					>
						Профиль
					</NavLink>
					{showProfileMenu && (
						<ProfileMenu
							isAuth={isAuth}
							userName={userName}
							isActiveProfile={isActiveProfile}
							onLogout={handleLogout}
							onLogin={handleLogin}
						/>
					)}
				</li>
        {isAdmin && (
				  <li className={navItem}>
				  	<NavLink
				  		to='/admin'
				  		className={({ isActive }) => cx(navItemStyle, isActive && navLine)}
				  	>
				  		Админ
				  	</NavLink>
				  </li>
        )}
				<li className={navItem}>
					<NavLink
						to='/favourites'
						className={({ isActive }) => cx(navItemStyle, isActive && navLine)}
					>
						Избранное
					</NavLink>
				</li>
				<li className={navItem}>
					<NavLink
						to='/basket'
						className={({ isActive }) => cx(navItemStyle, isActive && navLine)}
					>
						Корзина
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default NavSection