import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { RootStore } from '@/shared/store'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '@/shared/store/slices/UserSlice'
import { useUIContextNotification } from '@/shared/contexts/UIContext'
import { useDeviceType } from '@/shared/hooks'
import ProfileMenu from './ProfileMenu'

const NavSection = () => {
	const { isMobile } = useDeviceType()

  const { showNotification } = useUIContextNotification()

	const dispatch = useDispatch()
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)
	const userName = useSelector((state: RootStore) => state.user.userName)
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

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

	const handleLogout = () => {
		dispatch(logoutUser())
		showNotification('Вы вышли из аккаунта', 'success')
		localStorage.removeItem('auth')
	}

	const handleLogin = () => {
		if (location.pathname === '/profile') return
		showNotification('Войдите или зарегистрируйтесь', 'success')
		navigate('/profile')
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<nav
			className='header-nav'
			aria-label='Навигация по сайту'
		>
			<ul
				className='header-nav__list'
				aria-label='Навигация по сайту'
			>
				<li className='header-nav__item'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							(isActive ? 
								'header-nav__line header-nav__item-style' : 
								'header-nav__item-style'
							)}
					>
						Главная
					</NavLink>
				</li>
				<li className='header-nav__item'>
					<NavLink
						to='/favourites'
						className={({ isActive }) =>
							(isActive ? 
								'header-nav__line header-nav__item-style' : 
								'header-nav__item-style'
						)}
					>
						Избранное
					</NavLink>
				</li>
				<li
					className='header-nav__item'
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
						className={({ isActive }) =>
							(isActive ? 
								'header-nav__line header-nav__item-style' : 
								'header-nav__item-style'
							)}
						aria-label='Профиль'
					>
						Профиль
					</NavLink>
					{showProfileMenu && (
						<ProfileMenu
							isAuth={isAuth}
							userName={userName}
							isDarkTheme={isDarkTheme}
							isActiveProfile={isActiveProfile}
							onLogout={handleLogout}
							onLogin={handleLogin}
						/>
					)}
				</li>
				<li className='header-nav__item'>
					<NavLink
						to='/basket'
						className={({ isActive }) =>
							(isActive ? 
								'header-nav__line header-nav__item-style' : 
								'header-nav__item-style'
							)}
					>
						Корзина
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default NavSection