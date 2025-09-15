import { useSelector } from "react-redux"
import { memo, type JSX } from "react"
import type { RootStore } from "../../../redux"


const FavouritesHeader = (): JSX.Element => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <div className={`favouritesBox__table_header ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="favouritesBox__table_header-title">Наименование</div>
            <div style={{cursor: "default"}}>Стоимость</div>                                              
        </div>   
    )
}

export default memo(FavouritesHeader)