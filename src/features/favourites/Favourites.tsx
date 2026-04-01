import { useFavourites } from './hooks/useFavourites'
import { useEffect, useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import BlockEmpty from '@/shared/widgets/blockEmpty/BlockEmpty'
import FavouritesBox from './components/favouritesBox/FavouritesBox'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'
import { Spinner } from '@/shared/ui/spinner/Spinner'
import Head from 'next/head'

interface IFavouritesProps {
  loading: boolean
  children: ReactNode
  isAuth?: boolean
}

const Favourites = ({ loading, children, isAuth: isAuthProp = false }: IFavouritesProps) => {
  const { cartFavourites, isAdding } = useFavourites()

  const isAuthRedux = useSelector((state: RootStore) => state.user.isAuth)
  const isAuth = isAuthProp || isAuthRedux

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

  if ((loading && isAuth) || isAdding) return <Spinner />

  const hasFavourites = cartFavourites.length > 0
    
  return (
    <>
      <Head>
        <title>Избранное | Карандаши</title>
        <meta name='description' content='Ваши избранные товары в магазине карандашей' />
      </Head>
      {!hasFavourites && <BlockEmpty textUp={textUpButton} textDown={textDownButton} />}
      {hasFavourites && <FavouritesBox>{children}</FavouritesBox>}
      <Recommendations />
    </>
  )
}

export default Favourites


