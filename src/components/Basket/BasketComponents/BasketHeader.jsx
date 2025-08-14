import { useSelector } from "react-redux"
import { memo } from "react"


export default memo(function BasketHeader() {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)


    return (
        <div className={`basketBox__table_header ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="basketBox__table_header-title">Наименование</div>
            <div style={{cursor: "default"}}>Количество</div>
            <div style={{cursor: "default"}}>Стоимость</div>                                              
        </div>                 
    )
})