import { useState, useEffect } from 'react'


const ProgressBar = () => {
    const [scrolled, setScrolled] = useState<number>()

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            )
            
            const windowHeight = window.innerHeight || document.documentElement.clientHeight
            
            const scrollableHeight = documentHeight - windowHeight
            
            if (scrollableHeight <= 0) {
                setScrolled(0)
                return
            }
            
            let scrollPercent = (scrollTop / scrollableHeight) * 100
            
            scrollPercent = Math.max(0, Math.min(100, scrollPercent))
            
            setScrolled(Number(scrollPercent.toFixed(2)))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })
        
        handleScroll()
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])
    
    
    return (
        <div className='progress-bar' style={{width: scrolled+ '%'}} />
    )
}

export default ProgressBar