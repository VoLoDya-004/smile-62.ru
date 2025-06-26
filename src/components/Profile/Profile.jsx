import { memo } from "react"
import Form from './Form/Form'
import Recommendations from '../sub-components/Recommendations'


export default memo(function Profile() {

    
    return (
        <>
            <section className="form">
                <Form />
            </section>
            <Recommendations />
        </>
    )
})