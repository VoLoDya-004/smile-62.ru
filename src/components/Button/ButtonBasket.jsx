import {useTransition, useState, useEffect} from 'react'
import { memo } from "react"


export default memo(function ButtonBasket({addInBasketProductFavourites, productFavourites, 
    cartFavourites, cartBasket}) {
    const [isPending, startTransition] = useTransition()
    const [localBasket, setLocalBasket] = useState(cartBasket)
    const [basketStatus, setBasketStatus] = useState({})
    const [localBasketStatus, setLocalBasketStatus] = useState({})

    const handleAddInBasketProductFavourites = (id) => {
        startTransition(() => {
            setLocalBasket(prev => {
                if (prev.some(item => item.id === id)) return prev
                return [...prev, {id}]
            })
        })
        const product = cartFavourites.find(item => item.id === id)
        if (product) {
            setLocalBasketStatus(prev => ({...prev, [product.nazvanie] : true}))
        }
        addInBasketProductFavourites(id)
    }

    useEffect(() => {
        const status = {}
        cartFavourites.forEach((item) => {
            const isInBasket = cartBasket.some(basketItem => basketItem.nazvanie === item.nazvanie)
            status[item.nazvanie] = isInBasket
        })
        setBasketStatus(status)
    }, [cartBasket, cartFavourites])

    useEffect(() => {
        const initialLocalStatus = {}
        cartFavourites.forEach(item => {
            initialLocalStatus[item.nazvanie] = basketStatus[item.nazvanie] || false
        })
        setLocalBasketStatus(initialLocalStatus)
    }, [basketStatus, cartFavourites])


    return (
        <>
            {cartFavourites.map((card) => {
                const isBasket = localBasketStatus[card.nazvanie] || false


                return (
                    <>
                    {productFavourites.id === card.id && (
                    <div key={card.id} id={card.id} className="basketBox__product_controls">
                            <button
                                type="button"
                                className="basketBox__product_controls"
                                disabled={isPending}
                                onClick={() => {
                                    isBasket ?
                                        alert("Этот продукт уже в корзине") :
                                        handleAddInBasketProductFavourites(card.id)
                                }}
                            >
                                <svg width="25" height="24" className="basket-svg-hover" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        className={`basket-svg${isBasket ? "_active" : ""}`}
                                        d="M2.925.488a.833.833 0 0 0-1.517.691l4.295 9.416v.001c.005.008.023.05.046.09a.9.9 0 0 0 .979.446c.045-.01.089-.023.098-.026l6.22-1.853.105-.031c.44-.13.867-.256 1.201-.523.29-.232.517-.535.657-.88.16-.396.159-.842.158-1.3V4.105c0-.01 0-.06-.004-.11a.901.901 0 0 0-.488-.73.9.9 0 0 0-.447-.098H4.147L2.925.487ZM11.833 12a1.333 1.333 0 0 0 0 2.667h.007a1.333 1.333 0 0 0 0-2.667h-.007ZM3.167 13.334c0-.737.597-1.334 1.333-1.334h.007a1.333 1.333 0 0 1 0 2.667H4.5a1.333 1.333 0 0 1-1.333-1.333Z"
                                        fill="#fff"
                                    />
                                </svg>
                            </button>
                    </div>
                    )}
                    </>
                )
            })}
        </>
    )
})