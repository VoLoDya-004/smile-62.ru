import { useState, type JSX, type ReactNode } from "react"
import { useSelector } from "react-redux"
import type { RootStore } from "../../../redux"


interface IAccordionProps {
    title: string
    children: ReactNode
}


const Accordion = ({title, children}: IAccordionProps): JSX.Element => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

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

export default Accordion