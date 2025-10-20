import { memo } from 'react'
import Carousel from './MainComponents/Carousel'
import Cards from './MainComponents/Cards'
import FiltersBlock from './MainComponents/FiltersBlock'


const Main = () => {


    return (
        <>
            <h1 className='visually-hidden'>Интернет-магазин Smile</h1>
            <Carousel>
                <article 
                    className='slider__item'
                    aria-label='Первый слайд'
                >
                    <img 
                        src='/images/icons/advertisement1.png'
                        alt='Первый слайд'
                        loading='eager'
                        fetchPriority='high'
                    />
                </article>
                <article 
                    className='slider__item'
                    aria-label='Второй слайд'
                >
                    <img 
                        src='/images/icons/advertisement2.jpg' 
                        alt='Второй слайд'
                        loading='lazy'
                    />
                </article>
                <article 
                    className='slider__item'
                    aria-label='Третий слайд'
                >
                    <img 
                        src='/images/icons/advertisement3.jpg' 
                        alt='Третий слайд'
                        loading='lazy'
                    />
                </article>
            </Carousel>
            <FiltersBlock />
            <Cards />
        </>
    )
}

export default memo(Main)