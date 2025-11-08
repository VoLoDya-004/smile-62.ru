import { useDispatch, useSelector } from 'react-redux'
import type { RootStore } from '../../../../redux'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../../contexts/context'
import { useContext } from 'react'
import { logoutUser } from '../../../../redux/UserSlice'
import Button from '../../../Button/Button'


const ProfileAside = ({ 
	isDarkTheme, 
  	userName, 
  	onLogout 
}: { 
  	isDarkTheme: boolean
  	userName: string
  	onLogout: () => void
}) => {


  	return (
  	  	<section 
  	  	  	className={`user-aside ${isDarkTheme ? 'dark-theme' : ''}`}
  	  	  	aria-label='Ваш баланс'
  	  	>
  	  	  	<div className='user-aside__name'>{userName || 'Пользователь'}</div>
  	  	  	<div className='user-aside__sum'>Баланс: 0 &#x20bd;</div>
  	  	  	<Button className='button-violet'>
  	  	  	  	Пополнить
  	  	  	</Button>
  	  	  	<Button onClick={onLogout} className='button-violet'>
  	  	  	  	Выйти из аккаунта
  	  	  	</Button>
  	  	</section>
  	)
}


const FavoritesBlock = ({ 
  	isDarkTheme, 
  	favoritesCount,
  	itemText 
}: { 
  	isDarkTheme: boolean
  	favoritesCount: number
  	itemText: string
}) => {


  	return (
    	<section className={`profile-fav ${isDarkTheme ? 'dark-theme' : ''}`}>
    	  	<div className='profile-fav__block'>
    	  	  	<div className={`profile-fav__block-title ${isDarkTheme ? 'dark-theme' : ''}`}>
    	  	  	  	<NavLink 
    	  	  	  	  	to='/favourites' 
    	  	  	  	  	className={`profile-fav__block-title ${isDarkTheme ? 'dark-theme' : ''} text-decoration-none`}
    	  	  	  	>
    	  	  	  	  	Избранное
    	  	  	  	</NavLink>
    	  	  	</div>
    	  	  	<div className='profile-fav__block-count'>
    	  	  	  	{favoritesCount} {itemText}
    	  	  	</div>
    	  	</div>
    	  	<div className='profile-fav__block-svg' aria-hidden='true'>
    	  	  	<svg 
    	  	  	  	xmlns='http://www.w3.org/2000/svg'
    	  	  	  	width='42' 
    	  	  	  	height='38' 
    	  	  	  	viewBox='0 0 21 19'
    	  	  	>
    	  	  	  	<path 
    	  	  	  	  	className='clip-rule-evenodd'
    	  	  	  	  	fill='rgb(186, 155, 194)'
    	  	  	  	  	d='M6.225 0C2.755 0 0 2.639 0 6.082c0 2.149 1.37 4.31 
    	  	  	  	  	3.145 6.34 1.81 2.07 4.238 4.215 6.703 6.336a1 1 0 0 0 
    	  	  	  	  	1.304 0c2.465-2.12 4.893-4.266 6.703-6.336C19.631 10.392 
    	  	  	  	  	21 8.23 21 6.082 21 2.639 18.246 0 
    	  	  	  	  	14.775 0c-1.549 0-3.09.572-4.275 1.55A6.801 
    	  	  	  	  	6.801 0 0 0 6.225 0Z'
    	  	  	  	/>
    	  	  	</svg>
    	  	</div>
    	</section>
  	)
}


const BasketBlock = ({ 
  	isDarkTheme, 
  	basketCount,
  	itemText 
}: { 
  	isDarkTheme: boolean
  	basketCount: number
  	itemText: string
}) => {


  	return (
  	  	<section className={`profile-basket ${isDarkTheme ? 'dark-theme' : ''}`}>
  	  	  	<div className='profile-basket__block'>
  	  	  		<div className={`profile-basket__block-title ${isDarkTheme ? 'dark-theme' : ''}`}>
  	  	  	  	  	<NavLink 
  	  	  	  	  	  	to='/basket' 
  	  	  	  	  	  	className={`profile-basket__block-title ${isDarkTheme ? 'dark-theme' : ''} text-decoration-none`}
  	  	  	  	  	>
  	  	  	  	  	  	Корзина
  	  	  	  	  	</NavLink>
  	  	  	  	</div>
  	  	  	  	<div className='profile-basket__block-count'>
  	  	  	  	  	{basketCount} {itemText}
  	  	  	  	</div>
  	  	  	</div>
  	  	  	<div className='profile-basket__block-svg' aria-hidden='true'>
  	  	  	  	<svg 
  	  	  	  	  	width='42'
  	  	  	  	  	height='38' 
  	  	  	  	  	xmlns='http://www.w3.org/2000/svg'
  	  	  	  	  	viewBox='0 0 17 16'
  	  	  	  	>
  	  	  	  	  	<path 
  	  	  	  	  	  	fill='rgb(186, 155, 194)' 
  	  	  	  	  	  	d='M2.925.488a.833.833 0 0 0-1.517.691l4.295 
  	  	  	  	  	  	9.416v.001c.005.008.023.05.046.09a.9.9 0 0 0 
  	  	  	  	  	  	.979.446c.045-.10.089-.023.098-.026l6.22-1.853.105-.031c.44-.13.867-.256 
  	  	  	  	  	  	1.201-.523.29-.232.517-.535.657-.88.16-.396.159-.842.158-1.3V4.105c0-.01 
  	  	  	  	  	  	0-.06-.004-.11a.901.901 0 0 0-.488-.73.9.9 0 
  	  	  	  	  	  	0 0-.447-.098H4.147L2.925.487ZM11.833 
  	  	  	  	  	  	12a1.333 1.333 0 0 0 0 2.667h.007a1.333 1.333 0 0 
  	  	  	  	  	  	0 0-2.667h-.007ZM3.167 
  	  	  	  	  	  	13.334c0-.737.597-1.334 1.333-1.334h.007a1.333 
  	  	  	  	  	  	1.333 0 0 1 0 
  	  	  	  	  	  	2.667H4.5a1.333 1.333 0 0 1-1.333-1.333Z'
  	  	  	  	  	/>
  	  	  	  	</svg>
  	  	  	</div>
  	  	</section>
  	)
}

	function pluralize(number: number, words: string[]) {
	  	const cases = [2, 0, 1, 1, 1, 2]
	  	return words[
	  	  	(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
	  	]
	}


const FormAccount = () => {
  	const context = useContext(Context)
  	if (!context) {
  	  	throw new Error('Context must be used within a Provider')
  	}
  	const { productsFavourites } = context

  	const dispatch = useDispatch()
  	const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
  	const userName = useSelector((state: RootStore) => state.user.userName)
  	const totalBasket = useSelector((state: RootStore) => state.basket.total)

  	const handleLogout = () => {
  	  	sessionStorage.setItem('showLogoutNotification', 'true')
  	  	localStorage.removeItem('auth')
  	  	dispatch(logoutUser())
  	}

  	const itemTextBasket = pluralize(totalBasket.count, ['товар', 'товара', 'товаров'])
  	const itemTextFav = pluralize(productsFavourites.length, ['товар', 'товара', 'товаров'])


  	return (
  	  	<>
  	  	  	<ProfileAside 
  	  	  	  	isDarkTheme={isDarkTheme}
  	  	  	  	userName={userName}
  	  	  	  	onLogout={handleLogout}
  	  	  	/>
  	  	  	<section className='container-profile'>
  	  	  	  	<FavoritesBlock 
  	  	  	  	  	isDarkTheme={isDarkTheme}
  	  	  	  	  	favoritesCount={productsFavourites.length}
  	  	  	  	  	itemText={itemTextFav}
  	  	  	  	/>
  	  	  	  	<BasketBlock 
  	  	  	  	  	isDarkTheme={isDarkTheme}
  	  	  	  	  	basketCount={totalBasket.count}
  	  	  	  	  	itemText={itemTextBasket}
  	  	  	  	/>
  	  	  	</section>
  	  	</>
  	)
}

export default FormAccount