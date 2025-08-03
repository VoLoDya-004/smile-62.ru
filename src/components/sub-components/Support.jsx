import { createPortal } from "react-dom"
import ButtonCross from "../Button/ButtonCross"


export default function Support() {


    return createPortal(
        <div className="support">
            <div className="support__header">
                <span className="support__header_title">Поддержка</span>
                <ButtonCross
                    className="support__header_titleBtn"
                    id="support__header_titleBtn"
                />
            </div>
            <div className="support__main"></div>
            <form className="support__footer" method="post">
                <textarea className="support__footer_message" name="support" id="support" 
                placeholder="Ваше сообщение..." required>
                </textarea>
                <button className="support__footer_btn" id="support__footer_btn" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{fill: "none", width: "24", height: "24"}}>
                        <path style={{fill: "#fff", fillRule:"evenodd", clipRule: "evenodd"}} d="M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 6.414V19.5a1 1 0 0 0 1 1Z"/>
                    </svg>
                </button>
            </form>
        </div>,
        document.getElementById("confirmModalChat")
    )
}