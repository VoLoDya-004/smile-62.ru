import { NavLink, useLocation } from "react-router-dom"
import { memo, useEffect, useState, type JSX } from "react"
import type { RootStore } from "../../../redux"
import { useSelector, useDispatch } from "react-redux"
import {logoutUser} from "../../../redux/UserSlice"
import type { INotificationData } from "../../../types/types"
import Button from "../../Button/Button"
import Notification from "../../sub-components/Notification"


const TabSection = (): JSX.Element => {
	const dispatch = useDispatch()
	const isAuth = useSelector((state: RootStore) => state.user.isAuth)
	const userName = useSelector((state: RootStore) => state.user.userName)
	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

	const location = useLocation()
	const isActiveProfile = location.pathname === "/profile"

	const [showProfileMenu, setShowProfileMenu] = useState(false)
	const [notification, setNotification] = useState<INotificationData | null>(null)

	const showNotification = (message: string, type: "success" | "error" = "success") => {
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

	const handleLoginp = () => {
		showNotification('Войдите или зарегистрируйтесь', 'success')
	}

    useEffect(() => {
	    window.scrollTo(0, 0)
    }, [])


    return (
		<>
		{notification && (
			<Notification
				message={notification.message}
				type={notification.type}
				onClose={() => setNotification(null)}
			/>
		)}
        <ul className="menu">
            <li className="menu__item">
				<NavLink to="/" className={({ isActive }) =>
				(isActive ? "line line-text menu__item_style" : "menu__item_style")}>
					Главная
				</NavLink>
			</li>    
            <li className="menu__item">
				<NavLink to="/favourites" className={({ isActive }) =>
				(isActive ? "line line-text menu__item_style" : "menu__item_style")}>
					Избранное
				</NavLink>
			</li>
			<li className="menu__item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<NavLink to="/profile" className={({ isActive }) =>
					(isActive ? "line line-text menu__item_style" : "menu__item_style")}
				>
					Профиль
					{showProfileMenu && (
						isAuth ? (
							<div className={`header-profile ${isDarkTheme ? 'dark-theme' : ''}`}>
								<div 
									className={`header-profile__title ${isDarkTheme ? 'dark-theme' : ''}`}
									style={{
										paddingTop: isActiveProfile ? "14.5px" : "8px"
									}}
								>
									Имя: {userName || "Пользователь"}
								</div>
								<Button
									onClick={handleLogout}
									id="header-profile-out"
									className="form__registration_btn"
								>
									Выйти
								</Button>
							</div>	
						) : (
							<div className={`header-profile ${isDarkTheme ? 'dark-theme' : ''}`}>
								<div 
									className={`header-profile__title ${isDarkTheme ? 'dark-theme' : ''}`}
									style={{
										paddingTop: isActiveProfile ? "14.5px" : "8px"
									}}
								>
									Войдите в аккаунт
								</div>
								<Button
									id="header-profile-out"
									className="form__registration_btn"
									onClick={handleLoginp}
								>
									Войти
								</Button>
							</div>	
						)
					)}				
				</NavLink>
			</li>
  	    	<li className="menu__item">
				<NavLink to="/basket" className={({ isActive }) =>
				(isActive ? "line line-text menu__item_style" : "menu__item_style")}>
					Корзина
				</NavLink>
			</li>
        </ul>
		</>
    )
}

export default memo(TabSection)