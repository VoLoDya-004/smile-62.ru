import "../../../JS/pagination"
import "../../../JS/basket"
import { useEffect } from "react"
import { obnovylle } from "../../../JS/pagination"

export default function Cards() {
    useEffect(() => {
		obnovylle()
	})
    
    return (
        <div id= "catalog" className="setka">
            
        </div>
    )
}
