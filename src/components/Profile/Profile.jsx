import { memo } from "react"
import { useSelector } from "react-redux"
import Form from './Form/Form'
import Recommendations from '../sub-components/Recommendations'


export default memo(function Profile() {
    const isAuth = useSelector((state) => state.user.isAuth)


    return (
        <>
            <section className={`form ${isAuth ? 'no-wrap' : ''}`}>
                <Form />
            </section>
            <Recommendations />
        </>
    )
})


