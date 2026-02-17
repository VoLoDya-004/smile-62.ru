import Form from './components/form/Form'
import Recommendations from '@/shared/widgets/recommendations/Recommendations'

const Profile = () => {

  return (
    <>
      <h1 className='visually-hidden'>Профиль пользователя</h1>
      <Form />
      <Recommendations />
    </>
  )
}

export default Profile


