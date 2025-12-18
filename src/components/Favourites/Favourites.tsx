import { type ReactNode } from 'react'
import BlockEmpty from '../sub-components/BlockEmpty'
import FavouritesBox from './FavouritesComponents/FavouritesTable/FavouritesBox'
import Recommendations from '../sub-components/Recommendations'
import { useFavouritesContext } from '@/contexts/FavouritesContext'

interface IFavouritesProps {
  loading: boolean
  children: ReactNode
}

const Favourites = ({ loading, children }: IFavouritesProps) => {
  const { cartFavourites } = useFavouritesContext()

  if (loading) {
    return (
      <>
        <h2 className='centered-heading'>Загрузка товаров...</h2>
        <div className='spinner-cards'></div>
      </>
    )
  }

  const hasFavourites = cartFavourites.length > 0
    
  return (
    <>
      {!hasFavourites &&
        <BlockEmpty 
          textUp={'В избранных пока пусто'} 
          textDown={'Загляните на главную — собрали там товары, которые могут вам понравиться'} 
        />
      }
      {hasFavourites && <FavouritesBox>{children}</FavouritesBox>}
      <Recommendations />
    </>
  )
}

export default Favourites
