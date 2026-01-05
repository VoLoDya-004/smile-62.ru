import { useState, useEffect } from 'react'
import styles from './CookiesNotice.module.scss'

const CookiesNotice = () => {
  const {
    'cookies-notice': cookies,
    'cookies-notice-box': cookiesBox,
    'cookies-notice__btn': cookiesButton
  } = styles

  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const isVisited = localStorage.getItem('visited')
    if (!isVisited) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('visited', 'true')
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }
  
  return (
    <div className={cookiesBox}>
      <div className={cookies}>
        Мы используем cookies для улучшения работы сайта 
        <button 
          type='button'
          onClick={handleAccept}      
          className={cookiesButton}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default CookiesNotice