import { useEffect, useState } from "react"


export default function BasketCircleMobile({ totalBasket }) {
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