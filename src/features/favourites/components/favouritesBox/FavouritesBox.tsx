import { type ReactNode } from 'react'
import FavouritesHeader from '../favouritesHeader/FavouritesHeader'
import FavouritesClearString from '../FavouritesClearString'
import styles from './FavouritesBox.module.scss'

const FavouritesBox = ({ children }: { children: ReactNode }) => (
  <section className={styles['favourites-box']}>
    <FavouritesClearString />
    <FavouritesHeader />
    {children}
  </section>
)

export default FavouritesBox