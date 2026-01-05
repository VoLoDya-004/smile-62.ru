import Button from '@/shared/ui/buttons/Button'
import styles from './NavSection.module.scss'

interface ProfileMenuProps {
	isAuth: boolean
	userName: string | null
	isActiveProfile: boolean
	onLogout: () => void
	onLogin: () => void
}

const ProfileMenu = ({
	isAuth,
	userName,
	isActiveProfile,
	onLogout,
	onLogin
}: ProfileMenuProps) => {
  const {
    'profile-dropdown': profileDropdown,
    'profile-dropdown__title': profileDropdownTitle
  } = styles

	const name = isAuth ? `Имя: ${userName || 'Пользователь'}` : 'Войдите в аккаунт'
	const ButtonText = isAuth ? 'Выйти' : 'Войти'

	return (
		<aside 
			className={profileDropdown}
			aria-label='Меню профиля'
			style={{
				top: isActiveProfile ? '55px' : ''
			}}
		>
			<div className={profileDropdownTitle}>
				{name}
			</div>
			<Button onClick={isAuth ? onLogout : onLogin} className='button-violet'>
				{ButtonText}
			</Button>
		</aside>
	)
}

export default ProfileMenu