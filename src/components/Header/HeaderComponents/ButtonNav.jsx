import { useState, useEffect } from "react"

export default function ButtonNav() {
    const [toggle, setToggle] = useState("")
    const [image, setImage] = useState("/src/assets/images/icons/nav.png")
    const [visible, setVisible] = useState("none")

    const theme = localStorage.getItem("theme")

    function nav() {
        if (toggle === "") {
            setToggle("navbar")
            setImage("/src/assets/images/icons/cross.png")
            setVisible()
            document.getElementById("blackout").classList.add("blackout")
        } else {
            setToggle("")
            setImage("/src/assets/images/icons/nav.png")
            setVisible("none")
            document.getElementById("blackout").classList.remove("blackout")
        }
    }

    document.addEventListener('mouseup', function(e) {
            let container = document.querySelector('.navbar')
            let navigationBtn = document.getElementById("nav__button")
            if ((!container.contains(e.target)) && (!navigationBtn.contains(e.target))) {
                setVisible("none")
                setToggle("")
                document.getElementById("blackout").classList.remove("blackout")
                setImage("/src/assets/images/icons/nav.png")
            } else {
                setToggle("navbar")
                setImage("/src/assets/images/icons/cross.png")
                setVisible()
                document.getElementById("blackout").classList.add("blackout")
            }
    })

    useEffect (() => {
		let startTouchX = 0
		let endTouchX = 0
		let startTouchY = 0
	    let endTouchY = 0
		document.addEventListener("touchstart", (event) => {
			startTouchX = event.changedTouches[0].pageX
			startTouchY = event.changedTouches[0].pageY
		})
		document.addEventListener("touchend", (event) => {
			endTouchX = event.changedTouches[0].pageX
			endTouchY = event.changedTouches[0].pageY
			if (endTouchX > startTouchX && Math.abs(endTouchY-startTouchY) < 7 && startTouchX < 100) {
				setToggle("navbar")
                setImage("/src/assets/images/icons/cross.png")
                setVisible()
                document.getElementById("blackout").classList.add("blackout")
			}
			if (endTouchX < startTouchX && Math.abs(endTouchY-startTouchY) < 7) {
				setToggle("")
                setImage("/src/assets/images/icons/nav.png")
                setVisible("none")
                document.getElementById("blackout").classList.remove("blackout")
			}
		})
	})

    if (theme === "dark-theme") {
    return (
        <>
            <nav className="nav">
                <button id="nav__button" onClick={nav} ><img src={image} style={{width: "20px"}}/></button>
            </nav>
            <div className={`${toggle} dark-theme`}>
                <div className={`navbar__item ${visible}`}>Смартфоны</div>
                <div className={`navbar__item ${visible}`}>Аудиотехника</div>
                <div className={`navbar__item ${visible}`}>Телевизоры</div>
                <div className={`navbar__item ${visible}`}>Компьютеры</div>
                <div className={`navbar__item ${visible}`}>Красота и здоровье</div>
                <div className={`navbar__item ${visible}`}>Техника для кухни</div>
                <div className={`navbar__item ${visible}`}>Техника для дома</div>
                <div className={`navbar__item ${visible}`}>Фото и видео</div>
                <div className={`navbar__item ${visible}`}>Аксессуары</div>
                <div className={`navbar__item ${visible}`}>Сад и ремонт</div>
                <div className={`navbar__item ${visible}`}>Офис</div>
                <div className={`navbar__item ${visible}`}>Умные устройства</div>
                <div className={`navbar__item ${visible}`}>Автотовары</div>
                <div className={`navbar__item ${visible}`}>Сетевое оборудование</div>
                <div className={`navbar__item ${visible}`}>Планшеты</div>
                <div className={`navbar__item ${visible}`}>Ноутбуки</div>
                <div className={`navbar__item ${visible}`}>Кабели и адаптеры</div>
                <div className={`navbar__item ${visible}`}>Электронные книги</div>
                <div className={`navbar__item ${visible}`}>Климатическая техника</div>
                <div className={`navbar__item ${visible}`}>Техника для творчества</div>
                <div className={`navbar__item ${visible}`}>Отдых и развлечения</div>
                <div className={`navbar__item ${visible}`}>VR-гарнитуры</div>
                <div className={`navbar__item ${visible}`}>Устройства для безопасности</div>
                <div className={`navbar__item ${visible}`}>Техника для ремонта</div>
                <div className={`navbar__item ${visible}`}>Устройства для обучения</div>
            </div>
            <div id="blackout"></div>
        </>
    )} else {
        return (
            <>
                <nav className="nav">
                    <button id="nav__button" onClick={nav} ><img src={image} style={{width: "20px"}}/></button>
                </nav>
                <div className={toggle}>
                    <div className={`navbar__item ${visible}`}>Смартфоны</div>
                    <div className={`navbar__item ${visible}`}>Аудиотехника</div>
                    <div className={`navbar__item ${visible}`}>Телевизоры</div>
                    <div className={`navbar__item ${visible}`}>Компьютеры</div>
                    <div className={`navbar__item ${visible}`}>Красота и здоровье</div>
                    <div className={`navbar__item ${visible}`}>Техника для кухни</div>
                    <div className={`navbar__item ${visible}`}>Техника для дома</div>
                    <div className={`navbar__item ${visible}`}>Фото и видео</div>
                    <div className={`navbar__item ${visible}`}>Аксессуары</div>
                    <div className={`navbar__item ${visible}`}>Сад и ремонт</div>
                    <div className={`navbar__item ${visible}`}>Офис</div>
                    <div className={`navbar__item ${visible}`}>Умные устройства</div>
                    <div className={`navbar__item ${visible}`}>Автотовары</div>
                    <div className={`navbar__item ${visible}`}>Сетевое оборудование</div>
                    <div className={`navbar__item ${visible}`}>Планшеты</div>
                    <div className={`navbar__item ${visible}`}>Ноутбуки</div>
                    <div className={`navbar__item ${visible}`}>Кабели и адаптеры</div>
                    <div className={`navbar__item ${visible}`}>Электронные книги</div>
                    <div className={`navbar__item ${visible}`}>Климатическая техника</div>
                    <div className={`navbar__item ${visible}`}>Техника для творчества</div>
                    <div className={`navbar__item ${visible}`}>Отдых и развлечения</div>
                    <div className={`navbar__item ${visible}`}>VR-гарнитуры</div>
                    <div className={`navbar__item ${visible}`}>Устройства для безопасности</div>
                    <div className={`navbar__item ${visible}`}>Техника для ремонта</div>
                    <div className={`navbar__item ${visible}`}>Устройства для обучения</div>
                </div>
                <div id="blackout"></div>
            </>
        )
    }
}