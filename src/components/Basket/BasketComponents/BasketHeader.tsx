import { useSelector } from "react-redux"
import { memo, type JSX } from "react"
import type { RootStore } from "../../../redux"


const BasketHeader = (): JSX.Element => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <div className={`basketBox__table_header ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="basketBox__table_header-title">Наименование</div>
            <div style={{cursor: "default"}}>Количество</div>
            <div style={{cursor: "default"}}>Стоимость</div>                                              
        </div>                 
    )
}

export default memo(BasketHeader)