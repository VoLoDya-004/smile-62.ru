import { useSelector } from "react-redux"
import { memo } from "react"


export default memo(function FavouritesHeader() {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)


    return (
        <div className={`favouritesBox__table_header ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="favouritesBox__table_header-title">Наименование</div>
            <div style={{cursor: "default"}}>Стоимость</div>                                              
        </div>   
    )
})