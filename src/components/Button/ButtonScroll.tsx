import { useState, memo, useEffect } from 'react'
import ButtonArrow from './ButtonArrow'


const ButtonScroll = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    setVisible(scrolled > 100)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)

    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

    
  return (
    <ButtonArrow 
      onClick={scrollToTop} 
      ariaLabel='Вернуться наверх страницы'
      className='scroll-to-top-button'
      style={{display: visible ? 'block' : 'none'}}
    />
  )
}

export default memo(ButtonScroll)