import ButtonMainNav from "../Button/ButtonMainNav"
import TabSectionMobile from "../Header/HeaderComponents/TabSectionMobile"

export default function BlockEmpty({text1, text2}) {
    
    return (
        <>
            <div className="basket__empty">
                <b className="basket__empty_str1">{text1}</b><br/>
                <div className="basket__empty_str2">{text2}</div><br/>
                <ButtonMainNav />
            </div>

            <TabSectionMobile />
        </>
    )
}