import { memo } from 'react'
import Button from '../../../Button/Button'


interface ProfileMenuProps {
	isAuth: boolean
	userName: string | null
	isDarkTheme: boolean
	isActiveProfile: boolean
	onLogout: () => void
	onLogin: () => void
}


const ProfileMenu = memo(({
	isAuth,
	userName,
	isDarkTheme,
	isActiveProfile,
	onLogout,
	onLogin
}: ProfileMenuProps) => {

    
	return (
		<div className={`profile-menu ${isDarkTheme ? 'dark-theme' : ''}`}>
			<div
				className={`profile-menu__title ${isDarkTheme ? 'dark-theme' : ''}`}
				style={{
					paddingTop: isActiveProfile ? '14.5px' : '8px'
				}}
			>
				{isAuth ? `Имя: ${userName || 'Пользователь'}` : 'Войдите в аккаунт'}
			</div>
			<Button
				onClick={isAuth ? onLogout : onLogin}
				id='profile-menu-out'
				className='button-violet'
			>
				{isAuth ? 'Выйти' : 'Войти'}
			</Button>
		</div>
	)
})

export default ProfileMenu