import { memo } from "react"
import { useState } from "react"
import Form from './Form/Form'
import Recommendations from '../sub-components/Recommendations'


export default memo(function Profile() {
    const [isAuth, setIsAuth] = useState(false)
    
    return (
        <>
            <section className={`form ${isAuth ? 'no-wrap' : ''}`}>
                <Form isAuth={isAuth} setIsAuth={setIsAuth} />
            </section>
            <Recommendations />
        </>
    )
})