import { memo } from "react"


export default memo(function FavouritesHeader() {


    return (
        <div className="favouritesBox__table_header">
            <div className="favouritesBox__table_header-title">Наименование</div>
            <div style={{cursor: "default"}}>Стоимость</div>                                              
        </div>   
    )
})