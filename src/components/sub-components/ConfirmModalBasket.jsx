import { useEffect } from "react"


export default function ConfirmModalBasket({ isOpen, onConfirm, onCancel }) {
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

    
    return (
        <div id="confirmModalBasket" className="modalBasket" style={{ display: 'block' }}>
            <div className="modal-contentBasket">
                <p className="modal-contentBasket__title"><b>Удаление товара</b></p>
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
        </div>
    )
}
