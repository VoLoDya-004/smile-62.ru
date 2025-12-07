import { useState, useEffect, type JSX } from 'react'
import BlockEmpty from '../sub-components/BlockEmpty'
import FavouritesBox from './FavouritesComponents/FavouritesTable/FavouritesBox'
import Recommendations from '../sub-components/Recommendations'

interface IFavouritesProps {
  productsFavourites: JSX.Element[]
  loading: boolean
}

const Favourites = ({ productsFavourites, loading }: IFavouritesProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!loading) {
      setVisible(productsFavourites.length > 0)
    }
  }, [productsFavourites, loading])

  if (loading) {
    return (
      <>
        <h2 className='centered-heading'>Загрузка товаров...</h2>
        <div className='spinner-cards'></div>
      </>
    )
  }
    
  return (
    <>
      {!visible &&
        <BlockEmpty 
          textUp={'В избранных пока пусто'} 
          textDown={'Загляните на главную — собрали там товары, которые могут вам понравиться'} 
        />
      }
      {visible && <FavouritesBox productsFavourites={productsFavourites} />}
      <Recommendations />
    </>
  )
}

export default Favourites