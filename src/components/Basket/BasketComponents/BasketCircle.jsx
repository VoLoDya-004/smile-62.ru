import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function BasketCircle() {
    const totalBasket = useSelector((state) => state.basket.total)

    const [isVisible, setIsVisible] = useState(totalBasket.count > 0)

    useEffect(() => {
        setIsVisible(totalBasket.count > 0)
    }, [totalBasket])


    return (
        <>  
            {isVisible && <span className="circle">{totalBasket.count}</span>}
        </>
    )
}