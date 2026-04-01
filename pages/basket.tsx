import { useBasket } from '../src/features/basket/hooks/useBasket'
import Basket from '../src/features/basket/Basket'
import BasketList from '../src/features/basket/components/BasketList'
import Layout from '@/shared/layout/Layout'
import { basketApi } from '@/features/basket/api/basketApi'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = context.req.cookies.auth_token
    
    if (!token) {
      return {
        props: {
          initialBasket: [],
          isAuth: false
        }
      }
    }
    
    const { authApi } = await import('../src/features/profile/api/authApi')
    const userResponse = await authApi.getMe(token)
    
    if (!userResponse.success || !userResponse.user) {
      return {
        props: {
          initialBasket: [],
          isAuth: false
        }
      }
    }
    
    const userId = userResponse.user.id_user
    const basketData = await basketApi.getBasket(userId)
    
    return {
      props: {
        initialBasket: basketData || [],
        isAuth: true
      }
    }
  } catch {
    return {
      props: {
        initialBasket: [],
        isAuth: false
      }
    }
  }
}

export default function BasketPage({ isAuth }: { isAuth: boolean }) {
  const { loadingBasket } = useBasket()
  return (
    <Layout>
      <Basket loading={loadingBasket} isAuth={isAuth}>
        <BasketList />
      </Basket>
    </Layout>
  )
}