import { NavLink, useLocation } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import type { RootStore } from '../../../redux'
import { useSelector, useDispatch } from 'react-redux'
import {logoutUser} from '../../../redux/UserSlice'
import type { INotificationData } from '../../../types/types'
import useScreenWidth from '../../../hooks/useScreenWidth'
import useDeviceType from '../../../hooks/useDeviceType'
import Button from '../../Button/Button'
import Notification from '../../sub-components/Notification'

                                                                                      
const TabSection = () => {
	const {isMobile} = useDeviceType()

	const dispatch = useDispatch()
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)
	const userName = useSelector((state: RootStore) => state.user.userName)
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

	const location = useLocation()
	const isActiveProfile = location.pathname === '/profile'

	const [showProfileMenu, setShowProfileMenu] = useState(false)
	const [notification, setNotification] = useState<INotificationData | null>(null)

	const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
		setNotification({message, type})
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
	}

    useEffect(() => {
	    window.scrollTo(0, 0)
    }, [])

	const isMobileWidth = useScreenWidth(1001)


    return (
		<nav 
			className='menu__nav'
			aria-label='Навигация по сайту'
			aria-hidden={isMobileWidth ? 'true' : 'false'}
		>
		{notification && (
			<Notification
				message={notification.message}
				type={notification.type}
				onClose={() => setNotification(null)}
			/>
		)}
        <ul 
			className='menu' 
			aria-label='Навигация по сайту'
		>
            <li className='menu__item'>
				<NavLink 
					to='/' 
					className={({ isActive }) =>
						(isActive ? 'line line-text menu__item-style' : 'menu__item-style')}
				>
					Главная
				</NavLink>
			</li>    
            <li className='menu__item'>
				<NavLink 
					to='/favourites' 
					className={({ isActive }) =>
						(isActive ? 'line line-text menu__item-style' : 'menu__item-style')}
				>
					Избранное
				</NavLink>
			</li>
			<li 
				className='menu__item' 
				onMouseEnter={handleMouseEnter} 
				onMouseLeave={handleMouseLeave}
			>
				<NavLink 
					to='/profile' 
					className={({ isActive }) =>
					(isActive ? 'line line-text menu__item-style' : 'menu__item-style')}
					aria-label='Профиль'
				>
					Профиль
					{showProfileMenu && (
						isAuth ? (
							<div className={`header-profile ${isDarkTheme ? 'dark-theme' : ''}`}>
								<div 
									className={`
										header-profile__title ${isDarkTheme ? 'dark-theme' : ''}
									`}
									style={{
										paddingTop: isActiveProfile ? '14.5px' : '8px'
									}}
								>
									Имя: {userName || 'Пользователь'}
								</div>
								<Button
									onClick={handleLogout}
									id='header-profile-out'
									className='button-violet'
								>
									Выйти
								</Button>
							</div>	
						) : (
							<div className={`header-profile ${isDarkTheme ? 'dark-theme' : ''}`}>
								<div 
									className={`
										header-profile__title ${isDarkTheme ? 'dark-theme' : ''}
									`}
									style={{
										paddingTop: isActiveProfile ? '14.5px' : '8px'
									}}
								>
									Войдите в аккаунт
								</div>
								<Button
									id='header-profile-out'
									className='button-violet'
									onClick={handleLogin}
								>
									Войти
								</Button>
							</div>	
						)
					)}				
				</NavLink>
			</li>
  	    	<li className='menu__item'>
				<NavLink 
					to='/basket' 
					className={({ isActive }) =>
						(isActive ? 'line line-text menu__item-style' : 'menu__item-style')}
				>
					Корзина
				</NavLink>
			</li>
        </ul>
		</nav>
    )
}

export default memo(TabSection)