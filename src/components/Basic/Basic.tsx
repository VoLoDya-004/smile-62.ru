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
                        alt='Первый слайд'
                    />
                </div>
                <div className='slider__item'>
                    <img 
                        src='/images/icons/advertisement2.jpg' 
                        alt='Второй слайд'
                    />
                </div>
                <div className='slider__item'>
                    <img 
                        src='/images/icons/advertisement3.jpg' 
                        alt='Третий слайд'
                    />
                </div>
            </Carousel>
            <FiltersBlock />
            <Cards />
        </>
    )
}

export default memo(Basic)