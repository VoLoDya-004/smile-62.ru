import { memo } from "react"


export default memo(function BasketHeader() {
    

    return (
        <div className="basketBox__table_header">
            <div className="basketBox__table_header-title">Наименование</div>
            <div>Количество</div>
            <div>Стоимость</div>                                              
        </div>                 
    )
})