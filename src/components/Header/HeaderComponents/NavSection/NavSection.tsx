import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import type { RootStore } from '../../../../redux'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../../../redux/UserSlice'
import type { INotificationData } from '../../../../types/types'
import useDeviceType from '../../../../hooks/useDeviceType'
import Notification from '../../../sub-components/Notification'
import ProfileMenu from '../../../Profile/ProfileComponents/ProfileMenu/ProfileMenu'


const NavSection = () => {
	const { isMobile } = useDeviceType()

	const dispatch = useDispatch()
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)
	const userName = useSelector((state: RootStore) => state.user.userName)
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

	const location = useLocation()
	const navigate = useNavigate()
	const isActiveProfile = location.pathname === '/profile'

	const [showProfileMenu, setShowProfileMenu] = useState(false)
	const [notification, setNotification] = useState<INotificationData | null>(null)

	const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
		setNotification({ message, type })
	}

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(null)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [notification])

	const handleMouseEnter = () => {
		if (isMobile) return
		setShowProfileMenu(true)
	}

	const handleMouseLeave = () => {
		setShowProfileMenu(false)
	}

	const handleLogout = () => {
		dispatch(logoutUser())
		showNotification('Вы вышли из аккаунта', 'success')
		localStorage.removeItem('auth')
	}

	const handleLogin = () => {
		showNotification('Войдите или зарегистрируйтесь', 'success')
		if (location.pathname === '/profile') {
			return
		}
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
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
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
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
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

export default memo(NavSection)