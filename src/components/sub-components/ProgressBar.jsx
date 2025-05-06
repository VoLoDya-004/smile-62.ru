import { useState } from "react"

export default function ProgressBar() {
    const [scrolled, setScrolled] = useState()

    const ProgressBar = () => {
        let scroll = Math.ceil(document.body.scrollTop || document.documentElement.scrollTop)
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        setScrolled(scroll / height * 100)
    }

    window.addEventListener("scroll", ProgressBar)
    
    return (
        <div id="progressBar" style={{width: scrolled+ "%"}}></div>
    )
}