import { useState, useEffect } from 'react'


const CookiesNotice = () => {
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
    <div className="cookiesNoticeBox">
        <div className="cookiesNotice">
            Мы используем cookies для улучшения работы сайта 
            <button onClick={handleAccept} className="cookiesNotice__btn">Ok</button>
        </div>
    </div>
  )
}

export default CookiesNotice