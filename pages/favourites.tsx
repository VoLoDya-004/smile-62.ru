import { useFavourites } from '../src/features/favourites/hooks/useFavourites'
import Favourites from '../src/features/favourites/Favourites'
import FavouritesList from '../src/features/favourites/components/FavouritesList'
import Layout from '@/shared/layout/Layout'
import { IFav } from '@/features/favourites/types/favouritesTypes'
import { GetServerSideProps } from 'next'
import { favouritesApi } from '@/features/favourites/api/favouritesApi'

interface IFavouritesPageProps {
  initialFavourites: IFav[]
  isAuth: boolean
}

export const getServerSideProps: GetServerSideProps<IFavouritesPageProps> = async (context) => {
  try {
    const token = context.req.cookies.auth_token
    
    if (!token) {
      return {
        props: {
          initialFavourites: [],
          isAuth: false
        }
      }
    }
    
    const { authApi } = await import('../src/features/profile/api/authApi')
    const userResponse = await authApi.getMe(token)
    
    if (!userResponse.success || !userResponse.user) {
      return {
        props: {
          initialFavourites: [],
          isAuth: false
        }
      }
    }
    
    const userId = userResponse.user.id_user
    
    const favouritesData = await favouritesApi.getFavourites(userId)
    
    return {
      props: {
        initialFavourites: favouritesData || [],
        isAuth: true
      }
    }
  } catch {
    return {
      props: {
        initialFavourites: [],
        isAuth: false
      }
    }
  }
}

export default function FavouritesPage({ initialFavourites, isAuth }: IFavouritesPageProps) {
  const { loadingFavourites } = useFavourites()
  return (
    <Layout>
      <Favourites 
        loading={loadingFavourites}
        initialFavourites={initialFavourites}
        isAuth={isAuth}
      >
        <FavouritesList initialFavourites={initialFavourites} />
      </Favourites>
    </Layout>
  )
}