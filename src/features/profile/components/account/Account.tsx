import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { NavLink } from 'react-router-dom'
import { pluralize } from '@/shared/utils/pluralize'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import { useAuth } from '../../hooks/useAuth'
import { cx } from '@/shared/utils/classnames'
import { useFavourites } from '@/features/favourites/hooks/useFavourites'
import { useBasket } from '@/features/basket/hooks/useBasket'
import type { IBasket, IBasketTotal } from '@/features/basket/types/basketTypes'
import Button from '@/shared/ui/buttons/Button'
import styles from './Account.module.scss'

interface IProfileAsideProps {
  userName: string
  onLogout: () => void
  handleTopUpWallet: () => void
}

interface IBasketBlockProps {
  basketCount: number
  itemText: string
}

const ProfileAside = ({ userName, onLogout, handleTopUpWallet }: IProfileAsideProps) => {
  const {
    'user-aside': aside,
    'user-aside__name': asideName,
    'user-aside__sum': asideSum
  } = styles

  return (
    <section className={aside} aria-label='Ваш баланс'>
      <div className={asideName}>{userName || 'Пользователь'}</div>
      <div className={asideSum}>Баланс: 0 &#x20bd;</div>
      <Button onClick={handleTopUpWallet} className='button-violet'>
        Пополнить
      </Button>
      <Button onClick={onLogout} className='button-violet'>
        Выйти из аккаунта
      </Button>
    </section>
  )
}

interface IFavoritesBlockProps {
  favoritesCount: number
  itemText: string
}

const FavoritesBlock = ({ favoritesCount, itemText }: IFavoritesBlockProps) => {
  const {
    'profile-fav': profileFav,
    'profile-fav__block': profileFavBlock,
    'profile-fav__block-title': profileFavBlockTitle,
    'profile-fav__block-count': profileFavBlockCount,
    'profile-fav__block-svg': profileFavBlockSVG
  } = styles

  return (
  	<section className={profileFav}>
  	  <div className={profileFavBlock}>
  	    <div className={profileFavBlockTitle}>
  	      <NavLink 
  	        to='/favourites' 
  	        className={cx(profileFavBlockTitle, 'text-decoration-none')}
  	      >
  	        Избранное
  	      </NavLink>
  	    </div>
  	    <div className={profileFavBlockCount}>
  	      {favoritesCount} {itemText}
  	    </div>
  	  </div>
  	  <div className={profileFavBlockSVG} aria-hidden='true'>
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

const BasketBlock = ({ basketCount, itemText }: IBasketBlockProps) => {
  const {
    'profile-basket': profileBasket,
    'profile-basket__block': profileBasketBlock,
    'profile-basket__block-title': profileBasketBlockTitle,
    'profile-basket__block-count': profileBasketBlockCount,
    'profile-basket__block-svg': profileBasketBlockSVG
  } = styles

  return (
    <section className={profileBasket}>
      <div className={profileBasketBlock}>
      	<div className={profileBasketBlockTitle}>
        	<NavLink 
        	  to='/basket' 
        	  className={cx(profileBasketBlockTitle, 'text-decoration-none')}
        	>
        	  Корзина
        	</NavLink>
        </div>
        <div className={profileBasketBlockCount}>
        	{basketCount} {itemText}
        </div>
      </div>
      <div className={profileBasketBlockSVG} aria-hidden='true'>
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

const Account = () => {
  const { 'container-profile': container } = styles

  const { cartFavourites } = useFavourites()
  let { cartBasket } = useBasket()
  const { showNotification } = useUIContextNotification()
  const { handleLogout } = useAuth()

  const userName = useSelector((state: RootStore) => state.user.userName)

  cartBasket = cartBasket.filter((item: IBasket) => item.id > 0)

  const total = cartBasket.reduce((acc: IBasketTotal, item: IBasket) => {
    const count = Number(item.count)
    acc.count += (isNaN(count) || count <= 0) ? 0 : count
    return acc
  }, { count: 0 })

  const handleTopUpWallet = () => {
    showNotification('Фунционал в разработке', 'error')
  }

  const itemTextBasket = pluralize(total.count, ['товар', 'товара', 'товаров'])
  const itemTextFav = pluralize(cartFavourites.length, ['товар', 'товара', 'товаров'])

  return (
    <>
      <ProfileAside 
        userName={userName}
        onLogout={handleLogout}
        handleTopUpWallet={handleTopUpWallet}
      />
      <section className={container}>
        <FavoritesBlock favoritesCount={cartFavourites.length} itemText={itemTextFav} />
        <BasketBlock basketCount={total.count} itemText={itemTextBasket} />
      </section>
    </>
  )
}

export default Account