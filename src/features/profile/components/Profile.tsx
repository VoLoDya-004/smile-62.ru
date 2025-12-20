import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import Form from './profileComponents/Form'
import Recommendations from '@/shared/widgets/Recommendations'

const Profile = () => {
  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  return (
    <>
      <section className={`form ${isAuth ? 'no-wrap' : ''}`}>
        <Form />
      </section>
      <Recommendations />
    </>
  )
}

export default Profile


