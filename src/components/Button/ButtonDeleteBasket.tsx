import { useSelector } from 'react-redux'
import { memo } from 'react'
import type { RootStore } from '../../redux'


interface IButtonDeleteBasketProps {
    openDeleteModal: (id: number) => void
    id: number
    isPendingDelete: boolean
}


const ButtonDeleteBasket = ({openDeleteModal, id, isPendingDelete}: IButtonDeleteBasketProps) => {
        
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

 
    return (
        <div className={`basket-box__product-controls ${isDarkTheme ? 'dark-theme' : ''}`}>
            { isPendingDelete ? (
                <div className='spinner-basket'></div>  
            ) : (
            <button 
                type='button'
                data-action='delete-basket-product'
                className={`basket-box__product-controls ${isDarkTheme ? 'dark-theme' : ''}`}
                disabled={isPendingDelete}
                onClick={() => openDeleteModal(id)}
            >
                <span className="visually-hidden">
                    Удалить выбранный товар из корзины
                </span>
                <svg 
                    className='cross-svg-hover'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24' 
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path 
                        className='cross-svg'
                        d='M18 6L6 18'
                    />
                    <path 
                        className='cross-svg' 
                        d='M6 6L18 18' 
                    />
                </svg>
            </button>
            )}
        </div>
    )
}

export default memo(ButtonDeleteBasket)
