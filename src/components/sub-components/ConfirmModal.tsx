import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import type { RootStore } from '../../redux'


interface IConfirmModal {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    modalId: string
    portalId: string
    title: string
    description: string
}


const ConfirmModal = ({
    isOpen,
    onConfirm,
    onCancel,
    modalId,
    portalId,
    title,
    description
}: IConfirmModal) => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const modal = document.getElementById(modalId)
            if (modal && e.target === modal) {
                onCancel()
            }
        }

        if (isOpen) {
            window.addEventListener('click', handleClickOutside)
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen, onCancel, modalId])

    if (!isOpen) {
        return null
    }

    const portalTarget = document.getElementById(portalId)
    if (!portalTarget) {
        return null
    }


    return createPortal(
        <div 
            id={modalId} 
            className='modal-window'
        >
            <div className={`modal-content ${isDarkTheme ? 'dark-theme' : ''}`}>
                <p className={`modal-content__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                    <b>{title}</b>
                </p>
                <p className='modal-content__description'>{description}</p>
                <div className='modal-content__footer'>
                    <button 
                        type='button'
                        className='confirm-yes'
                        onClick={onConfirm}
                    >
                           Удалить
                    </button>
                    <button 
                        type='button'
                        className='confirm-no'
                        onClick={onCancel}
                    >
                        Оставить
                    </button>
                </div>
            </div>
        </div>,
        portalTarget
    )
}

export default ConfirmModal