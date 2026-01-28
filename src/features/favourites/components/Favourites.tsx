import { useFavourites } from '../hooks/useFavourites'
import { useEffect, useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import BlockEmpty from '@/shared/widgets/blockEmpty/BlockEmpty'
import FavouritesBox from './favouritesComponents/FavouritesBox'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'

interface IFavouritesProps {
  loading: boolean
  children: ReactNode
}

const Favourites = ({ loading, children }: IFavouritesProps) => {
  const { cartFavourites, loadingAddFavourites } = useFavourites()

  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  const [textUpButton, setTextUpButton] = useState('')
  const [textDownButton, setTextDownButton] = useState('')

  useEffect(() => {
    if (isAuth) {
      setTextUpButton('В избранных пока пусто')
      setTextDownButton('Загляните на главную — собрали там товары, которые могут вам понравиться')
    } else {
      setTextUpButton('Войдите в аккаунт')
      setTextDownButton('Для просмотра избранных необходимо войти в аккаунт')
    }
  }, [isAuth])

  if (loading && isAuth) {
    return (
      <>
        <h2 className='centered-heading'>
          {loadingAddFavourites.size > 0 ? 'Добавление товара...' : 'Загрузка товаров...'}
        </h2>
        <div className='spinner-cards'></div>
      </>
    )
  }

  const hasFavourites = cartFavourites.length > 0
    
  return (
    <>
      {!hasFavourites && <BlockEmpty textUp={textUpButton} textDown={textDownButton} />}
      {hasFavourites && <FavouritesBox>{children}</FavouritesBox>}
      <Recommendations />
    </>
  )
}

export default Favourites


