import { useFavourites } from '../src/features/favourites/hooks/useFavourites'
import Favourites from '../src/features/favourites/Favourites'
import FavouritesList from '../src/features/favourites/components/FavouritesList'
import Layout from '@/shared/layout/Layout'
import { GetServerSideProps } from 'next'
import { favouritesApi } from '@/features/favourites/api/favouritesApi'

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default function FavouritesPage({ isAuth }: { isAuth: boolean }) {
  const { loadingFavourites } = useFavourites()
  
  return (
    <Layout>
      <Favourites loading={loadingFavourites} isAuth={isAuth}>
        <FavouritesList />
      </Favourites>
    </Layout>
  )
}