import { useState } from "react"
import { useSelector } from "react-redux"


export default function Accordion({title, children}) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className="accordion">
            <div 
                className={`accordion__header ${isDarkTheme ? 'dark-theme' : ''}`} 
                onClick={toggle}>{title} {isOpen ? "▴" : "▾"}
            </div>
            {isOpen && <div className="accordion__content">{children}</div>}
        </div>
    )
}