import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../../redux'


const BasketCircle = () => {
    const totalBasket = useSelector((state: RootStore) => state.basket.total)

    const [isVisible, setIsVisible] = useState(totalBasket.count > 0)

    useEffect(() => {
        setIsVisible(totalBasket.count > 0)
    }, [totalBasket])


    return (
        <>  
            {isVisible && 
                <span className='circle'>
                    {totalBasket.count}
                </span>
            }
        </>
    )
}

export default BasketCircle