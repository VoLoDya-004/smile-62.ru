import { memo } from "react"


export default memo(function BasketHeader() {
    

    return (
        <div className="basketBox__table_header">
            <div className="basketBox__table_header-title">Наименование</div>
            <div style={{cursor: "default"}}>Количество</div>
            <div style={{cursor: "default"}}>Стоимость</div>                                              
        </div>                 
    )
})