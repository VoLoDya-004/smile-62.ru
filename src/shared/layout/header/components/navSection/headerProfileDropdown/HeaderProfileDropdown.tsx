import Button from '@/shared/ui/buttons/Button'
import styles from './HeaderProfileDropdown.module.scss'
import { cx } from '@/shared/utils/classnames'

interface HeaderProfileDropdownProps {
	isAuth: boolean
	userName: string | null
	isActiveProfile: boolean
	onLogout: () => void
	onLogin: () => void
  isLoggingOut: boolean
}

const HeaderProfileDropdown = ({
	isAuth,
	userName,
	isActiveProfile,
	onLogout,
	onLogin,
  isLoggingOut
}: HeaderProfileDropdownProps) => {
  const {
    'profile-dropdown': profileDropdown,
    'profile-dropdown__title': profileDropdownTitle
  } = styles

	const name = isAuth ? `${userName || 'Пользователь'}` : 'Войдите в аккаунт'
	const ButtonText = isLoggingOut ? 'Выход...' : isAuth ? 'Выйти' : 'Войти'

	return (
		<aside 
			className={profileDropdown}
			aria-label='Меню профиля'
			style={{ top: isActiveProfile ? '55px' : '' }}
		>
			<div className={profileDropdownTitle}>
				{name}
			</div>
			<Button 
        onClick={isAuth ? onLogout : onLogin} 
        className={cx(isLoggingOut ? 'button-violet button-violet_disabled' : 'button-violet')}
        disabled={isLoggingOut}
      >
				{ButtonText}
			</Button>
		</aside>
	)
}

export default HeaderProfileDropdown