import { useSelector } from "react-redux"
import ButtonMainNav from "../Button/ButtonMainNav"


export default function BlockEmpty({text1, text2}) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)
    
    
    return (
            <div className={`basket__empty ${isDarkTheme ? 'dark-theme' : ''}`}>
                <b className="basket__empty_str1">{text1}</b><br/>
                <div className="basket__empty_str2">{text2}</div><br/>
                <ButtonMainNav />
            </div>
    )
}