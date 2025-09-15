import { useSelector } from "react-redux"
import { createPortal } from "react-dom"
import type { RootStore } from "../../redux"
import ButtonCross from "../Button/ButtonCross"
import type React from "react"


const Support: React.FC = () => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const portalTarget = document.getElementById("confirmModalChat")
    if(!portalTarget) {
        return null
    }


    return createPortal(
        <div className="support">
            <div className={`support__header ${isDarkTheme ? 'dark-theme' : ''}`}>
                <span className="support__header_title">Поддержка</span>
                <ButtonCross
                    className="support__header_titleBtn"
                    id="support__header_titleBtn"
                />
            </div>
            <div className={`support__main ${isDarkTheme ? 'dark-theme' : ''}`}></div>
            <form className={`support__footer ${isDarkTheme ? 'dark-theme' : ''}`} method="post">
                <textarea className={`support__footer_message ${isDarkTheme ? 'dark-theme' : ''}`} 
                name="support" id="support" 
                placeholder="Ваше сообщение..." required>
                </textarea>
                <button className="support__footer_btn" id="support__footer_btn" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{fill: "none", width: "24", height: "24"}}>
                        <path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}} d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
                    </svg>
                </button>
            </form>
        </div>,
        portalTarget
    )
}

export default Support