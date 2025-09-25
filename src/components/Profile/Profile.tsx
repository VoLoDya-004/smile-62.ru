import { memo } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../redux/index'
import Form from './Form/Form'
import Recommendations from '../sub-components/Recommendations'


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

export default memo(Profile)


