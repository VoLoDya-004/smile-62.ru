import { useState, memo } from 'react'
import ButtonArrow from './ButtonArrow'


const ButtonScroll = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 100) {
            setVisible(true)
        } else if (scrolled <= 100) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible)
    
    
    return (
        <ButtonArrow 
            onClick={scrollToTop} 
            ariaLabel='Вернуться наверх страницы'
            className='scroll-to-top-btn'
            style={{display: visible ? 'block' : 'none'}}
        />
    )
}

export default memo(ButtonScroll)