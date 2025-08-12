import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function BasketCircleMobile() {
  const totalBasket = useSelector((state) => state.basket.total)

  const [isVisibleCircle, setIsVisibleCircle] = useState()

  useEffect(() => {
    if (totalBasket && typeof totalBasket.count === 'number') {
      setIsVisibleCircle(totalBasket.count > 0)
    }
  }, [totalBasket])

  return (
    <>
      {isVisibleCircle && (
        <span
          className="circle__mobile"
          style={{
            marginTop: totalBasket.count > 0 ? '-17px' : '0px',
          }}
        >
          {totalBasket.count}
        </span>
      )}
    </>
  )
}