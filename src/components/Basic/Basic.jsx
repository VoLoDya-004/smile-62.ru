import Carousel from './Carousel/Carousel'
import Cards from './Cards/Cards'
import ButtonLoad from '../Button/ButtonLoad'
import ScrollToTopBtn from './ScrollToTopBtn/ScrollToTopBtn'
import ProgressBar from './ProgressBar/ProgressBar'

export default function Basic() {

    return (
        <>
            <ProgressBar />
            <Carousel>
                <div className="slider__item"><img style={{width: "100%"}} src="/src/assets/images/icons/advertisement1.png" alt="image" /></div>
                <div className="slider__item"><img style={{width: "100%"}} src="/src/assets/images/icons/advertisement2.jpg" alt="image" /></div>
                <div className="slider__item"><img style={{width: "100%"}} src="/src/assets/images/icons/advertisement3.jpg" alt="image" /></div>
            </Carousel>
            <Cards />
            <ButtonLoad text={"Загрузить ещё"} />
            <ScrollToTopBtn />
        </>
    )
}