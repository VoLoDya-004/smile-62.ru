import { type ReactNode } from 'react'
import FavouritesHeader from './FavouritesHeader'
import FavouritesClearString from '../FavouritesClearString'

interface IFavouritesBoxProps {
  children: ReactNode
}

const FavouritesBox = ({ children }: IFavouritesBoxProps) => {

  return (
    <section className='favourites-box'>
      <FavouritesClearString />
      <section className='favourites-box__table'>
        <FavouritesHeader />
        {children}
      </section>
    </section>
  )
}

export default FavouritesBox