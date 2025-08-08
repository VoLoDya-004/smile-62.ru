import { useState, memo, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../../JS/context"

export default memo(function ButtonNav() {
    const context = useContext(Context)
    const { setSelectedCategory, setCurrentPage, categories, 
    activeCategoryId, setActiveCategoryId } = context

    const [toggle, setToggle] = useState("")
    const [image, setImage] = useState("/images/icons/nav.png")
    const [visible, setVisible] = useState("none")

    const navigate = useNavigate()
    const theme = localStorage.getItem("theme")

    function nav() {
        if (toggle === "") {
            setToggle("navbar")
            setImage("/images/icons/cross.png")
            setVisible("block")
            document.getElementById("blackout").classList.add("blackout")
            document.body.classList.add('modal-open')
        } else {
            setToggle("")
            setImage("/images/icons/nav.png")
            setVisible("none")
            document.getElementById("blackout").classList.remove("blackout")
            document.body.classList.remove('modal-open')
        }
    }

    document.addEventListener('mouseup', function(e) {
        let container = document.querySelector('.navbar')
        let navigationBtn = document.getElementById("nav__button")
        if ((!container.contains(e.target)) && (!navigationBtn.contains(e.target))) {
            setVisible("none")
            setToggle("")
            document.body.classList.remove('modal-open')
            document.getElementById("blackout").classList.remove("blackout")
            setImage("/images/icons/nav.png")
        } else {
            setToggle("navbar")
            setImage("/images/icons/cross.png")
            setVisible("block")
            document.body.classList.add('modal-open')
            document.getElementById("blackout").classList.add("blackout")
        }
    })

    const handleCategorySelect = (id) => {
        setCurrentPage(1)
        navigate("/")
        setSelectedCategory(id)
        setActiveCategoryId(id)
        setVisible("none")
        setToggle("")
        document.body.classList.remove('modal-open')
        document.getElementById("blackout").classList.remove("blackout")
        setImage("/images/icons/nav.png")
    }


    return (
        <>
        <nav className="nav">
            <button id="nav__button" onClick={nav} >
                <img src={image} style={{width: "20px"}}/>
            </button>
        </nav>
        
        <div className={theme === "dark-theme" ? `${toggle} dark-theme` : toggle}>
            {categories.map(cat => (
                <div
                    key={cat.id}
                    className={`navbar__item ${visible} ${activeCategoryId === cat.id ? 'active' : ''}`}
                    id={cat.label}
                    onClick={() => handleCategorySelect(cat.id)}
                >
                    {cat.label}
                </div>
            ))}
        </div>
        </>
    )
})

