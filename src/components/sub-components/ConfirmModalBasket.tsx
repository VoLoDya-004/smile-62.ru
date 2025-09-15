import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { createPortal } from "react-dom"
import type { RootStore } from "../../redux"


interface IConfirmModalBasket {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
}


const ConfirmModalBasket: React.FC<IConfirmModalBasket> = ({ isOpen, onConfirm, onCancel }) => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
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

    const portalTarget = document.getElementById("confirmModalBasketDelete")
    if(!portalTarget) {
        return null
    }

    
    return createPortal(
        <div id="confirmModalBasket" className="modalBasket" style={{ display: 'block' }}>
            <div className={`modal-contentBasket ${isDarkTheme ? 'dark-theme' : ''}`}>
                <p className={`modal-contentBasket__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                    <b>Удаление товара</b>
                </p>
                <p className="modal-contentBasket__description">
                    Удалить выбранный товар? Отменить действие будет невозможно.
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
        portalTarget
    )
}

export default ConfirmModalBasket
