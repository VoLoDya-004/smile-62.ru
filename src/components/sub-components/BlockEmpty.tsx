import { useSelector } from "react-redux"
import type { RootStore } from "../../redux"
import type { JSX } from "react"
import ButtonMainNav from "../Button/ButtonMainNav"


interface IBlockEmptyProps {
    text1: string
    text2: string
}


const BlockEmpty = ({text1, text2}: IBlockEmptyProps): JSX.Element => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
    
    
    return (
            <div className={`basket__empty ${isDarkTheme ? 'dark-theme' : ''}`}>
                <b className="basket__empty_str1">{text1}</b><br/>
                <div className="basket__empty_str2">{text2}</div><br/>
                <ButtonMainNav />
            </div>
    )
}

export default BlockEmpty