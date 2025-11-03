import React, { useState, memo, useEffect, useCallback, useMemo, useContext} from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../redux'
import type { INotificationData, IFav, IProduct } from '../../types/types'
import { Context } from '../../contexts/context'
import Notification from '../sub-components/Notification'


interface IButtonBasketProps {
    id: number
    addInBasketProductFavourites: (id: number) => Promise<void>
    productFavourites: IFav
    cartFavourites: IFav[]
    cartBasket: IProduct[]
}


const ButtonBasket = ({
    addInBasketProductFavourites, 
    productFavourites, 
    cartFavourites, 
    cartBasket}: IButtonBasketProps) => 
{  
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const { updateBasketData, setLoadingBasket } = context

    const [notification, setNotification] = useState<INotificationData | null>(null)
    const [addingStatus, setAddingStatus] = useState<Record<number, boolean>>({})

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const basketProductIds = useMemo(() => 
        new Set(cartBasket.map(item => Number(item.id_product)))
    , [cartBasket])

	const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
		setNotification({message, type})
	}, [])

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null)
            }, 1000)  

            return () => clearTimeout(timer)
        }
    }, [notification])

    const handleAddInBasketProductFavourites = useCallback(async (id: number) => {
        if (addingStatus[id] || basketProductIds.has(id)) {
            return
        }

        setLoadingBasket(true)
        setAddingStatus(prev => ({...prev, [id]: true}))

        try {
            await addInBasketProductFavourites(id)
            await updateBasketData()
            showNotification('Добавлено в корзину', 'success')
        } catch (error) {
            showNotification('Ошибка', 'error')
        }
        finally {
            setLoadingBasket(false)
        }
    }, [basketProductIds, addingStatus, addInBasketProductFavourites, showNotification, 
    updateBasketData])

    const filterCards = useMemo(() => 
        cartFavourites.filter(card => productFavourites.id === card.id)
    , [cartFavourites, productFavourites.id])


    return (
        <>
        	{notification && (
        		<Notification
          			message={notification.message}
          			type={notification.type}
          			onClose={() => setNotification(null)}
        		/>
      		)}
            {filterCards.map((card) => {
                const isBasket = basketProductIds.has(Number(card.id))
                const isLoading = addingStatus[card.id]


                return (
                    <React.Fragment key={card.id}>
                        {productFavourites.id === card.id && (
                            <div  
                                id={String(card.id)} 
                                className={`
                                    basket-box__product-controls 
                                    ${isDarkTheme ? 'dark-theme' : ''}
                                `}
                            >
                                <button
                                    type='button'
                                    disabled={isBasket || isLoading}
                                    className={`
                                        basket-box__product-controls 
                                        ${isDarkTheme ? 'dark-theme' : ''}
                                    `}
                                    onClick={() => handleAddInBasketProductFavourites(card.id)}
                                >
                                    <span className='visually-hidden'>
                                        {isBasket ? 
                                            'Товар уже в корзине' : 
                                            'Добавить избранный товар в корзину'
                                        }
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
                                                ${isBasket || isLoading ? 
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












