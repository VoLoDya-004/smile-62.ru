import Layout from '@/shared/layout/Layout'
import AdminPanel from '../src/features/admin/AdminPanel'
import { GetServerSideProps } from 'next'
import { authApi } from '@/features/profile/api/authApi'
import { adminApi } from '@/features/admin/api/adminApi'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = context.req.cookies.auth_token
    
    if (!token) {
      return {
        props: {
          isAdmin: false
        }
      }
    }
    
    const userResponse = await authApi.getMe(token)
    
    if (!userResponse.success || !userResponse.user) {
      return {
        props: {
          isAdmin: false
        }
      }
    }
    
    const isAdmin = userResponse.user.is_admin == 1
    const userId = userResponse.user.id_user
    
    if (!isAdmin) {
      return {
        props: {
          isAdmin: false
        }
      }
    }
    

    const ordersResponse = await adminApi.getAllOrders(userId, 1, 15, '', 'desc', [], [])
    const statsResponse = await adminApi.getStats(userId)
    const usersResponse = await adminApi.getAllUsers(userId, 1, 30, '', 'all')
    const productsResponse = await adminApi.getAllProducts(userId, 1, 20, '', 0)
    
    return {
      props: {
        isAdmin: true,
        initialOrders: ordersResponse.orders || [],
        initialStats: statsResponse.stats || null,
        initialUsers: usersResponse.users || [],
        initialProducts: productsResponse.products || [],
        totalOrdersCount: ordersResponse.total || 0,
        totalUsersCount: usersResponse.total || 0,
        totalProductsCount: productsResponse.total || 0
      }
    }
  } catch {
    return {
      props: {
        isAdmin: false
      }
    }
  }
}

export default function AdminPage({ isAdmin }: { isAdmin: boolean  }) {
  return (
    <Layout>
      <AdminPanel isAdmin={isAdmin} />
    </Layout>
  )
}