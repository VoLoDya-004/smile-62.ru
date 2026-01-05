import { useEffect, useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { usePortal } from '@/shared/hooks'
import styles from './Modals.module.scss'

interface IConfirmModal {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  modalId: string
  portalId: string
  title: string
  description: string
}

const ModalHeader = ({ title }: { title: string }) => (
  <h3 className={styles['modal-delete-content__title']}>{title}</h3>
)

const ModalBody = ({ description }: { description: string }) => (
  <p className={styles['modal-delete-content__description']}>{description}</p>
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
  <div className={styles['modal-delete-content__footer']}>
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
  title,
  description,
  onConfirm,
  onCancel,
  initialFocusRef
}: {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  initialFocusRef: RefObject<HTMLButtonElement | null>
}) => {
  const { 'modal-delete-content': modalContent } = styles

  return (
    <div className={modalContent}>
      <ModalHeader title={title} />
      <ModalBody description={description} />
      <ModalFooter 
        onConfirm={onConfirm}
        onCancel={onCancel}
        initialFocusRef={initialFocusRef}
      />
    </div>
  )
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
    } else {
      const allChildren = Array.from(document.body.children)
      allChildren.forEach(child => {
        child.removeAttribute('inert')
      })
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
      className={styles['modal-window']}
      role='alertdialog'
      aria-modal='true'
    >
      <ModalContent 
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


