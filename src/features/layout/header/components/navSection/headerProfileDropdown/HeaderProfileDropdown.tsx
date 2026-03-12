import Button from '@/shared/ui/buttons/Button'
import styles from './HeaderProfileDropdown.module.scss'

interface HeaderProfileDropdownProps {
	isAuth: boolean
	userName: string | null
	isActiveProfile: boolean
	onLogout: () => void
	onLogin: () => void
}

const HeaderProfileDropdown = ({
	isAuth,
	userName,
	isActiveProfile,
	onLogout,
	onLogin
}: HeaderProfileDropdownProps) => {
  const {
    'profile-dropdown': profileDropdown,
    'profile-dropdown__title': profileDropdownTitle
  } = styles

	const name = isAuth ? `${userName || 'Пользователь'}` : 'Войдите в аккаунт'
	const ButtonText = isAuth ? 'Выйти' : 'Войти'

	return (
		<aside 
			className={profileDropdown}
			aria-label='Меню профиля'
			style={{ top: isActiveProfile ? '55px' : '' }}
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

export default HeaderProfileDropdown