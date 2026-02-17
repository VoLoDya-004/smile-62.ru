import { type ReactNode } from 'react'
import FavouritesHeader from './FavouritesHeader'
import FavouritesClearString from './FavouritesClearString'
import styles from './Favourites.module.scss'

interface IFavouritesBoxProps {
  children: ReactNode
}

const FavouritesBox = ({ children }: IFavouritesBoxProps) => {
  const {
    'favourites-box': favouritesBox,
    'favourites-box__table': favouritesBoxTable
  } = styles

  return (
    <section className={favouritesBox}>
      <FavouritesClearString />
      <section className={favouritesBoxTable}>
        <FavouritesHeader />
        {children}
      </section>
    </section>
  )
}

export default FavouritesBox