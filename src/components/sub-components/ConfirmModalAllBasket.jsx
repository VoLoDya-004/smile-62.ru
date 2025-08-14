import { useEffect } from "react"
import { useSelector } from "react-redux"
import { createPortal } from "react-dom"


export default function ConfirmModalAllBasket({ isOpen, onConfirm, onCancel }) {
    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)

    useEffect(() => {
        const handleClickOutside = (e) => {
            const modal = document.getElementById("confirmModalBasket")
            if (modal && e.target === modal) {
                onCancel()
            }
        }

        if (isOpen) {
            window.addEventListener('click', handleClickOutside)
        }

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen, onCancel])

    if (!isOpen) {
        return null
    }

    
    return createPortal(
        <div 
            id="confirmModalBasket" 
            className="modalBasket" 
            style={{ display: 'block' }}
        >
            <div className={`modal-contentBasket ${isDarkTheme ? 'dark-theme' : ''}`}>
                <p className={`modal-contentBasket__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                    <b>Удаление корзины</b>
                </p>
                <p className="modal-contentBasket__description">
                    Удалить все товары из корзины? Отменить действие будет невозможно.
                </p>
                <div className="modal-contentBasket__footer">
                    <button id="confirmYesBasket" 
                        className="confirmYesBasket" 
                        onClick={onConfirm}>
                           Удалить
                    </button>
                    <button id="confirmNoBasket" className="confirmNoBasket"
                    onClick={onCancel}>Оставить</button>
                </div>
            </div>
        </div>,
        document.getElementById("confirmModalBasketDeleteAll")
    )
}