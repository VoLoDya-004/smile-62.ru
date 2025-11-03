import { useState, useEffect } from 'react'


const ProgressBar = () => {
    const [scrolled, setScrolled] = useState<number>(0)

    useEffect(() => {
        const getViewportHeight = () => {
            if (window.visualViewport) {
                return window.visualViewport.height
            }
            return window.innerHeight
        }

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const scrollHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            )
            
            const currentViewportHeight = getViewportHeight()
            const scrollableHeight = scrollHeight - currentViewportHeight
            
            if (scrollableHeight <= 0) {
                setScrolled(0)
                return
            }
            
            let scrollPercent = (scrollTop / scrollableHeight) * 100
            
            const isAtBottom = scrollTop + currentViewportHeight >= scrollHeight - 2
            
            if (isAtBottom || scrollPercent >= 99.9) {
                scrollPercent = 100
            }
            
            setScrolled(Math.min(100, Math.max(0, scrollPercent)))
        }

        const handleViewportChange = () => {
            setTimeout(handleScroll, 50)
        }

        const initTimer = setTimeout(handleScroll, 100)
        
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleViewportChange, { passive: true })
        window.addEventListener('orientationchange', handleViewportChange, { passive: true })
        
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportChange)
            window.visualViewport.addEventListener('scroll', handleScroll)
        }

        window.addEventListener('load', handleScroll, { passive: true })
        
        return () => {
            clearTimeout(initTimer)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleViewportChange)
            window.removeEventListener('orientationchange', handleViewportChange)
            window.removeEventListener('load', handleScroll)
            
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleViewportChange)
                window.visualViewport.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])
    

    return (
        <div className='progress-bar' style={{width: scrolled + '%'}} />
    )
}

export default ProgressBar