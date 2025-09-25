import { memo } from 'react'
import Carousel from './Carousel/Carousel'
import Cards from './Cards/Cards'
import FiltersBlock from './FiltersBlock/FiltersBlock'


const Basic = () => {


    return (
        <>
            <Carousel>
                <div className='slider__item'>
                    <img 
                        src='/images/icons/advertisement1.png'
                        alt='img'
                    />
                </div>
                <div className='slider__item'>
                    <img 
                        src='/images/icons/advertisement2.jpg' 
                        alt='img'
                    />
                </div>
                <div className='slider__item'>
                    <img 
                        src='/images/icons/advertisement3.jpg' 
                        alt='img'
                    />
                </div>
            </Carousel>
            <FiltersBlock />
            <Cards />
        </>
    )
}

export default memo(Basic)