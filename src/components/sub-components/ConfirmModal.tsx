import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import type { RootStore } from '../../redux'
import { usePortal } from '../../hooks/usePortal'


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

    const portalElement = usePortal(portalId, isOpen)

    const btnYesRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const modal = document.getElementById(modalId)
            if (modal && e.target === modal) {
                onCancel()
            }
        }

        if (isOpen) {
            btnYesRef.current?.focus()
            const allChildren = Array.from(document.body.children)
            allChildren.forEach(child => {
                if (child.id !== portalId) {
                    child.setAttribute('inert', '')
                }
            })
            window.addEventListener('click', handleClickOutside)
            document.body.classList.add('modal-open')
        } else {
            const allChildren = Array.from(document.body.children)
            allChildren.forEach(child => {
                child.removeAttribute('inert')
            })
            document.body.classList.remove('modal-open')
        }

        return () => {
            window.removeEventListener('click', handleClickOutside)
            const allChildren = Array.from(document.body.children)
            allChildren.forEach(child => {
                child.removeAttribute('inert')
            })
        }
    }, [isOpen, onCancel, modalId])

    if (!portalElement || !isOpen) {
        return null
    }


    return createPortal(
        <div 
            id={modalId} 
            className='modal-window'
            role='alertdialog'
            aria-modal='true'
        >
            <div className={`modal-content ${isDarkTheme ? 'dark-theme' : ''}`}>
                <h3 className={`modal-content__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                    {title}
                </h3>
                <p className='modal-content__description'>{description}</p>
                <div className='modal-content__footer'>
                    <button 
                    ref={btnYesRef}
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
        portalElement
    )
}

export default ConfirmModal