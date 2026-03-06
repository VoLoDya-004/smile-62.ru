import { Helmet } from 'react-helmet-async'
import Form from './components/form/Form'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'

const Profile = () => {

  return (
    <>
      <Helmet>
        <title>Профиль | Smile</title>
        <meta name='description' content='Ваш профиль в интернет-магазине Smile' />
      </Helmet>
      <h1 className='visually-hidden'>Профиль пользователя</h1>
      <Form />
      <Recommendations />
    </>
  )
}

export default Profile


