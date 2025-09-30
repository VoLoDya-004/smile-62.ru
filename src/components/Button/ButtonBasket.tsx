import React, { useState, useEffect, memo} from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../redux'
import type { INotificationData, IFav, IBasket } from '../../types/types'
import Notification from '../sub-components/Notification'


interface IButtonBasketProps {
    id: number
    addInBasketProductFavourites: (id: number) => void
    productFavourites: IFav
    cartFavourites: IFav[]
    cartBasket: IBasket[]
}


const ButtonBasket = ({
    addInBasketProductFavourites, 
    productFavourites, 
    cartFavourites, 
    cartBasket}: IButtonBasketProps) => 
{  
    const [basketStatus, setBasketStatus] = useState<Record<string, boolean>>({})
    const [localBasketStatus, setLocalBasketStatus] = useState<Record<string, boolean>>({})
    const [notification, setNotification] = useState<INotificationData | null>(null)

	const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
		setNotification({message, type})
	}

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const handleAddInBasketProductFavourites = (id: number) => {
        const product = cartFavourites.find(item => item.id === id)
        if (product) {
            setLocalBasketStatus(prev => ({...prev, [product.nazvanie] : true}))
        }
        addInBasketProductFavourites(id)
    }

    useEffect(() => {
        const status: Record<string, boolean> = {}
        cartFavourites.forEach((item) => {
            const isInBasket = cartBasket.some(basketItem => basketItem.nazvanie === item.nazvanie)
            status[item.nazvanie] = isInBasket
        })
        setBasketStatus(status)
    }, [cartBasket, cartFavourites])

    useEffect(() => {
        const initialLocalStatus: Record<string, boolean> = {}
        cartFavourites.forEach(item => {
            initialLocalStatus[item.nazvanie] = basketStatus[item.nazvanie] || false
        })
        setLocalBasketStatus(initialLocalStatus)
    }, [basketStatus, cartFavourites])


    return (
        <>
        	{notification && (
        		<Notification
          			message={notification.message}
          			type={notification.type}
          			onClose={() => setNotification(null)}
        		/>
      		)}
            {cartFavourites.map((card) => {
                const isBasket = localBasketStatus[card.nazvanie] || false


                return (
                    <React.Fragment key={card.id}>
                        {productFavourites.id === card.id && (
                            <div  
                                id={String(card.id)} 
                                className='basket-box__product-controls'
                            >
                                <button
                                    type='button'
                                    className={`
                                        basket-box__product-controls 
                                        ${isDarkTheme ? 'dark-theme' : ''}
                                    `}
                                    onClick={() => {
                                        isBasket ?
                                            showNotification('товар уже в корзине', 'success') :
                                            handleAddInBasketProductFavourites(card.id)
                                    }}
                                >
                                    <span className="visually-hidden">
                                        Добавить избранный товар в корзину
                                    </span>
                                    <svg 
                                        width='25'
                                        height='24' 
                                        className='basket-svg-block'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            className=
                                            {`
                                                ${isBasket ? 
                                                    'basket-svg_active' : 
                                                    'basket-svg_passive'
                                                } ${isDarkTheme ? 
                                                    'dark-theme' : 
                                                    ''
                                                }
                                            `} 
                                            d='M2.925.488a.833.833 0 0 0-1.517.691l4.295 
                                            9.416v.001c.005.008.023.05.046.09a.9.9 0 0 0 
                                            .979.446c.045-.01.089-.023.098-.026l6.22-1.853.105-.031c.44-.13.867-.256 
                                            1.201-.523.29-.232.517-.535.657-.88.16-.396.159-.842.158-1.3V4.105c0-.01 
                                            0-.06-.004-.11a.901.901 0 0 0-.488-.73.9.9 0 0 
                                            0-.447-.098H4.147L2.925.487ZM11.833 12a1.333 
                                            1.333 0 0 0 0 2.667h.007a1.333 1.333 0 0 0 
                                            0-2.667h-.007ZM3.167 13.334c0-.737.597-1.334 
                                            1.333-1.334h.007a1.333 1.333 0 0 1 0 
                                            2.667H4.5a1.333 1.333 0 0 1-1.333-1.333Z'
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}

export default memo(ButtonBasket)