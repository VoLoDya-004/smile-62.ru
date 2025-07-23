import { memo } from 'react'
import Carousel from './Carousel/Carousel'
import Cards from './Cards/Cards'


export default memo(function Basic() {


    return (
        <>
            <Carousel>
                <div className="slider__item">
                    <img style={{width: "100%"}} 
                    src="/images/icons/advertisement1.png" alt="image" />
                </div>
                <div className="slider__item">
                    <img style={{width: "100%"}} 
                    src="/images/icons/advertisement2.jpg" alt="image" />
                </div>
                <div className="slider__item">
                    <img style={{width: "100%"}} 
                    src="/images/icons/advertisement3.jpg" alt="image" />
                </div>
            </Carousel>
            <Cards />
        </>
    )
})