import { type JSX } from 'react'
import FavouritesHeader from './FavouritesHeader'
import FavouritesClearString from '../FavouritesClearString'

interface IFavouritesBoxProps {
  productsFavourites: JSX.Element[]
}

const FavouritesBox = ({ productsFavourites }: IFavouritesBoxProps) => {

  return (
    <section className='favourites-box'>
      <FavouritesClearString />
      <section className='favourites-box__table'>
        <FavouritesHeader />
        {productsFavourites}
      </section>
    </section>
  )
}

export default FavouritesBox