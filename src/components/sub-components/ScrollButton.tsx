import { useState } from "react"
import { memo } from "react"


const ScrollButton = () => {
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

    window.addEventListener("scroll", toggleVisible)
    
    
    return (
        <button id="scrollToTopBtn" onClick={scrollToTop} style={{display: visible ? "block" : "none"}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{fill: "none", width: "24", height: "24"}}>
                <path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}} d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
            </svg>
        </button>
    )
}

export default memo(ScrollButton)