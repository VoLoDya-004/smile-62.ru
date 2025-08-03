import { useState } from "react"


export default function Accordion({title, children}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className="accordion">
            <div className="accordion__header" onClick={toggle}>{title} {isOpen ? "▴" : "▾"}</div>
            {isOpen && <div className="accordion__content">{children}</div>}
        </div>
    )
}