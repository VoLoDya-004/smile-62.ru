import { useEffect, useRef, type RefObject } from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import type { RootStore } from '@/redux'
import { usePortal } from '@/hooks/usePortal'

interface IConfirmModal {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  modalId: string
  portalId: string
  title: string
  description: string
}


const ModalHeader = ({ 
  title, 
  isDarkTheme 
}: { 
  title: string
  isDarkTheme: boolean 
}) => (
  <h3 className={`modal-content__title ${isDarkTheme ? 'dark-theme' : ''}`}>
    {title}
  </h3>
)


const ModalBody = ({ description }: { description: string }) => (
  <p className='modal-content__description'>{description}</p>
)


const ModalFooter = ({
  onConfirm,
  onCancel,
  initialFocusRef
}: {
  onConfirm: () => void
  onCancel: () => void
  initialFocusRef: RefObject<HTMLButtonElement | null>
}) => (
  <div className='modal-content__footer'>
    <button 
      ref={initialFocusRef}
      type='button'
      className='confirm-delete-button'
      onClick={onConfirm}
    >
      Удалить
    </button>
    <button 
      type='button'
      className='confirm-cancel-button'
      onClick={onCancel}
    >
      Оставить
    </button>
  </div>
)


const ModalContent = ({
  isDarkTheme,
  title,
  description,
  onConfirm,
  onCancel,
  initialFocusRef
}: {
  isDarkTheme: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  initialFocusRef: RefObject<HTMLButtonElement | null>
}) => (
  <div className={`modal-content ${isDarkTheme ? 'dark-theme' : ''}`}>
    <ModalHeader title={title} isDarkTheme={isDarkTheme} />
    <ModalBody description={description} />
    <ModalFooter 
      onConfirm={onConfirm}
      onCancel={onCancel}
      initialFocusRef={initialFocusRef}
    />
  </div>
)


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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
      window.addEventListener('keydown', handleKeyDown)
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
      window.removeEventListener('keydown', handleKeyDown)

      const allChildren = Array.from(document.body.children)
      allChildren.forEach(child => {
        child.removeAttribute('inert')
      })
    }
  }, [isOpen, onCancel, modalId, portalId])

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
      <ModalContent 
        isDarkTheme={isDarkTheme}
        title={title}
        description={description}
        onConfirm={onConfirm}
        onCancel={onCancel}
        initialFocusRef={btnYesRef}
      />
    </div>,
    portalElement
  )
}

export default ConfirmModal


