import { useEffect, useState } from "react"


export default function BasketCircle({ totalBasket }) {
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