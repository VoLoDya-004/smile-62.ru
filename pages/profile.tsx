import { GetServerSideProps } from 'next'
import Profile from '../src/features/profile/Profile'
import Layout from '../src/shared/layout/Layout'
import { authApi } from '@/features/profile/api/authApi'

interface IProfilePageProps {
  initialUser?: {
    id_user: number
    name: string
    email: string
    is_admin: number
  } | null
  isAuth: boolean
}

export const getServerSideProps: GetServerSideProps<IProfilePageProps> = async (context) => {
  try {
    const token = context.req.cookies.auth_token

    if (!token) {
      return {
        props: {
          isAuth: false,
          initialUser: null
        }
      }
    }
    
    const response = await authApi.getMe(token)
    
    if (response.success && response.user) {
      return {
        props: {
          isAuth: true,
          initialUser: {
            id_user: response.user.id_user,
            name: response.user.name,
            email: response.user.email,
            is_admin: response.user.is_admin
          }
        }
      }
    }
    
    return {
      props: {
        isAuth: false,
        initialUser: null
      }
    }
  } catch (error) {
    return {
      props: {
        isAuth: false,
        initialUser: null
      }
    }
  }
}

export default function ProfilePage({ initialUser, isAuth }: IProfilePageProps) {
  return (
    <Layout>
      <Profile initialUser={initialUser} isAuth={isAuth} />
    </Layout>
  )
}