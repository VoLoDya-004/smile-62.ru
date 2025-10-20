import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import type { RootStore } from '../../redux'
import { usePortal } from '../../hooks/usePortal'
import { useEffect } from 'react'
import ButtonCross from '../Button/ButtonCross'


interface SupportProps {
    isOpen: boolean
    onClose: () => void
}


const Support = ({ isOpen, onClose }: SupportProps) => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
    const portalElement = usePortal('confirm-modal-chat', isOpen)


    useEffect(() => {
        const modal = document.getElementById('confirm-modal-chat')
        
        if (!isOpen || !modal) return

        modal.onclick = (e) => {
            if (e.target === modal) {
                onClose()
                document.body.classList.remove('modal-open')
            }
        }

        const allChildren = Array.from(document.body.children)
        allChildren.forEach(child => {
            if (child.id !== 'confirm-modal-chat') {
                child.setAttribute('inert', '')
            }
        })

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return
            
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            
            if (!focusableElements || focusableElements.length === 0) return

            const first = focusableElements[0] as HTMLElement
            const last = focusableElements[focusableElements.length - 1] as HTMLElement

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleTab)

        return () => {
            document.removeEventListener('keydown', handleTab)

            const allChildren = Array.from(document.body.children)
            allChildren.forEach(child => {
                child.removeAttribute('inert')
            })
        }
    }, [isOpen, onClose, portalElement])

    const closeModal = () => {
        onClose()
        document.body.classList.remove('modal-open')
    }

    if (!portalElement || !isOpen) {
        return null
    }


    return createPortal(
        <div 
            className='support' 
            role='dialog' 
            aria-modal='true' 
            tabIndex={-1}
        >
            <div className={`support__header ${isDarkTheme ? 'dark-theme' : ''}`}>
                <h3 className='support__header-title margin-null'>Поддержка</h3>
                <ButtonCross
                    className='button-cross'
                    id='button-cross'
                    onClick={closeModal}
                />
            </div>
            <div className={`support__main ${isDarkTheme ? 'dark-theme' : ''}`}></div>
            <form 
                method='post'
                className={`support__footer ${isDarkTheme ? 'dark-theme' : ''}`} 
            >
                <textarea 
                    className={`support__footer-message ${isDarkTheme ? 'dark-theme' : ''}`} 
                    name='support'
                    id='support' 
                    placeholder='Ваше сообщение...' 
                    required
                >
                </textarea>
                <button 
                    className='support__footer-btn' 
                    id='support__footer-btn'
                    type='submit'
                    aria-label='Отправить сообщение в поддержку'
                >
                    <svg 
                        className='svg-btn-fill-none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path 
                            className='white-fill-clip'
                            d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
                            1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
                            1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
                        />
                    </svg>
                </button>
            </form>
        </div>,
        portalElement
    )
}

export default Support