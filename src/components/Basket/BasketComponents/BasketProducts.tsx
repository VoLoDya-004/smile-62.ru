import { useState, useTransition, type ChangeEvent, memo } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../../../redux'
import type { IBasket } from '../../../types/types'
import ButtonDeleteBasket from '../../Button/ButtonDeleteBasket'


interface IBasketProductsProps {
    productBasket: IBasket
    deleteProductBasket: (id: number) => void
    onChange: (e: ChangeEvent<HTMLInputElement>, id: number) => void
    isPendingDelete: boolean
}

const priceFormatter = new Intl.NumberFormat()


const BasketProducts = ({productBasket, deleteProductBasket, onChange, isPendingDelete}
    : IBasketProductsProps) => 
{
    const { id, nazvanie, image, count, price_total } = productBasket
    const [isPending, startTransition] = useTransition()
    const [localCount, setLocalCount] = useState(count)

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const handleIncrease = () => {
        startTransition(() => {
            const newCount = Math.min(+localCount + 1, 100)
            setLocalCount(newCount)
            onChange(
                {target: {value: newCount.toString()}} as ChangeEvent<HTMLInputElement>,
                id
            )
        })
    }

    const handleDecrease = () => {
        startTransition(() => {
            const newCount = Math.max(+localCount - 1, 1)
            setLocalCount(newCount)
            onChange(
                {target: {value: newCount.toString()}} as ChangeEvent<HTMLInputElement>,
                id
            )
        })
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        let newCount = value === '' ? 1 : parseInt(value, 10)
        if (isNaN(newCount) || newCount < 1) {
            newCount = 1
        } else if (newCount > 100) {
            newCount = 100;
        }
        startTransition(() => {
            setLocalCount(newCount)
            onChange(e, id)
        })
    }


    return (       
        <div className='basket-box__product'>
            <div className='basket-box__product-img'>
                <img 
                    className='basket-box__product-img'
                    src={image} 
                    alt='img'
                />
            </div>
            <div className='basket-box__product-title'>{nazvanie}</div>
            <div className='basket-box__product-count'>
                <div className='basket-box__product-count-box'>
                    <input
                        onChange={handleInputChange}
                        className='basket-box__product-count-input'
                        type='number'
                        min='1'
                        max='100'
                        value={localCount}
                    />
                </div>
                <div className='basket-box__product-count-controls'>
                    <button
                        onClick={handleIncrease}
                        disabled={isPending}
                        type='button'
                        className={`count__up count-svg-hover ${isDarkTheme ? 'dark-theme' : ''}`}
                    >
                        <svg 
                            width='14'
                            height='8'
                            viewBox='0 0 14 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path 
                                className='count-svg' 
                                d='M13 7L7 1L1 7' 
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleDecrease}
                        disabled={isPending}
                        type='button'
                        className={`count__down count-svg-hover ${isDarkTheme ? 'dark-theme' : ''}`}
                    >
                        <svg 
                            width='14'
                            height='8'
                            viewBox='0 0 14 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path 
                                className='count-svg' 
                                d='M1 1L7 7L13 1' 
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='basket-box__product-price'>
                {priceFormatter.format(price_total * localCount)} руб.
            </div>
                <ButtonDeleteBasket 
                    deleteProductBasket={deleteProductBasket} 
                    id={id}
                    isPendingDelete={isPendingDelete} 
                />
        </div>
    )
}

export default memo(BasketProducts)
