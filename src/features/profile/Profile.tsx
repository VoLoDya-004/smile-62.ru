import Head from 'next/head'
import Form from './components/form/Form'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from '@/shared/store/slices/userSlice'

interface IProfileProps {
  initialUser?: {
    id_user: number
    name: string
    email: string
    is_admin: number
  } | null
  isAuth: boolean
}


const Profile = ({ initialUser, isAuth }: IProfileProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth && initialUser) {
      dispatch(setUser({
        userId: initialUser.id_user,
        userName: initialUser.name,
        userEmail: initialUser.email,
        isAuth: true,
        isAdmin: initialUser.is_admin === 1
      }))
    }
  }, [isAuth, initialUser, dispatch])

  return (
    <>
      <Head>
        <title>Профиль | Smile</title>
        <meta name='description' content='Ваш профиль в интернет-магазине Smile' />
      </Head>
      <h1 className='visually-hidden'>Профиль пользователя</h1>
      <Form initialUser={initialUser} isAuth={isAuth} />
      <Recommendations />
    </>
  )
}

export default Profile


