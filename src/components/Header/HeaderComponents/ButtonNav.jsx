import { useState, memo, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../../JS/context"


export default memo(function ButtonNav() {
    const context = useContext(Context)
    const {setSelectedCategory, setCurrentPage} = context

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
                <div className={`navbar__item ${visible}`} id="allCategories"
                onClick={() => handleCategorySelect(0)}>
                    Все категории
                </div>
                <div className={`navbar__item ${visible}`} id="smartphones"
                onClick={() => handleCategorySelect(2)}>
                    Смартфоны
                </div>
                <div className={`navbar__item ${visible}`} id="televisions"
                onClick={() => handleCategorySelect(4)}>
                    Телевизоры
                </div>
                <div className={`navbar__item ${visible}`} id="computers"
                onClick={() => handleCategorySelect(5)}>
                    Компьютеры
                </div>
                <div className={`navbar__item ${visible}`} id="beautyAndHealth"
                onClick={() => handleCategorySelect(6)}>
                    Красота и здоровье
                </div>
                <div className={`navbar__item ${visible}`} id="kitchenAppliances"
                onClick={() => handleCategorySelect(7)}>
                    Техника для кухни
                </div>
                <div className={`navbar__item ${visible}`} id="audioEquipment"
                onClick={() => handleCategorySelect(8)}>
                    Аудиотехника
                </div>
                <div className={`navbar__item ${visible}`} id="photoAndVideo"
                onClick={() => handleCategorySelect(9)}>
                    Фото и видео
                </div>
                <div className={`navbar__item ${visible}`} id="accessories"
                onClick={() => handleCategorySelect(10)}>
                    Аксессуары
                </div>
                <div className={`navbar__item ${visible}`} id="gardenAndRepair"
                onClick={() => handleCategorySelect(11)}>
                    Сад и огород
                </div>
                <div className={`navbar__item ${visible}`} id="office"
                onClick={() => handleCategorySelect(12)}>
                    Офис
                </div>
                <div className={`navbar__item ${visible}`} id="smartDevices"
                onClick={() => handleCategorySelect(13)}>
                    Умные устройства
                </div>
                <div className={`navbar__item ${visible}`} id="carProducts"
                onClick={() => handleCategorySelect(14)}>
                    Автотовары
                </div>
                <div className={`navbar__item ${visible}`} id="networkEquipment"
                onClick={() => handleCategorySelect(15)}>
                    Сетевое оборудование
                </div>
                <div className={`navbar__item ${visible}`} id="tablets"
                onClick={() => handleCategorySelect(3)}>
                    Планшеты
                </div>
                <div className={`navbar__item ${visible}`} id="laptops"
                onClick={() => handleCategorySelect(1)}>
                    Ноутбуки
                </div>
                <div className={`navbar__item ${visible}`} id="cablesAndAdapters"
                onClick={() => handleCategorySelect(16)}>
                    Кабели и адаптеры
                </div>
                <div className={`navbar__item ${visible}`} id="eBooks"
                onClick={() => handleCategorySelect(17)}>
                    Электронные книги
                </div>
                <div className={`navbar__item ${visible}`} id="climateEquipment"
                onClick={() => handleCategorySelect(18)}>
                    Климатическая техника
                </div>
                <div className={`navbar__item ${visible}`} id="creativeEquipment"
                onClick={() => handleCategorySelect(19)}>
                    Техника для творчества
                </div>
                <div className={`navbar__item ${visible}`} id="leisureAndEntertainment"
                onClick={() => handleCategorySelect(20)}>
                    Отдых и развлечения
                </div>
                <div className={`navbar__item ${visible}`} id="vrHeadsets"
                onClick={() => handleCategorySelect(21)}>
                    VR-гарнитуры
                </div>
                <div className={`navbar__item ${visible}`} id="securityDevices"
                onClick={() => handleCategorySelect(22)}>
                    Устройства для безопасности
                </div>
                <div className={`navbar__item ${visible}`} id="repairEquipment"
                onClick={() => handleCategorySelect(23)}>
                    Техника для ремонта
                </div>
                <div className={`navbar__item ${visible}`} id="homeAppliances"
                onClick={() => handleCategorySelect(24)}>
                    Техника для дома
                </div>
            </div>
            </>
        )
    })

