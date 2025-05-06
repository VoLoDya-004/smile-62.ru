import Form from './Form/Form'
import Recommendations from './Recommendations/Recommendations'

export default function Profile() {
    return (
        <>
        <section className="form">
            <Form />
        </section>
            <Recommendations />
        </>
    )
}