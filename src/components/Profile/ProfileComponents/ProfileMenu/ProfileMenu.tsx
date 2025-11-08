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
	const name = isAuth ? `Имя: ${userName || 'Пользователь'}` : 'Войдите в аккаунт'
	const ButtonText = isAuth ? 'Выйти' : 'Войти'

    
	return (
		<aside 
			className={`profile-dropdown ${isDarkTheme ? 'dark-theme' : ''}`}
			aria-label='Меню профиля'
			style={{
				top: isActiveProfile ? '55px' : ''
			}}
		>
			<div
				className={`profile-dropdown__title ${isDarkTheme ? 'dark-theme' : ''}`}
			>
				{name}
			</div>
			<Button
				onClick={isAuth ? onLogout : onLogin}
				className='button-violet'
			>
				{ButtonText}
			</Button>
		</aside>
	)
})

export default ProfileMenu