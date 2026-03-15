import { useEffect, useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { usePortal } from '@/shared/hooks'
import type { IConfirmModal } from './types/modalsTypes'
import styles from './Modals.module.scss'
import { cx } from '@/shared/utils/classnames'

const ModalHeader = ({ title }: { title: string }) => (
  <h3 className={styles['modal-delete-content__title']}>{title}</h3>
)

const ModalBody = ({ description }: { description: string }) => (
  <p className={styles['modal-delete-content__description']}>{description}</p>
)

const ModalFooter = ({
  onConfirm,
  onCancel,
  initialFocusRef,
  isDeletingAccount = false,
  confirmText = 'Удалить', 
  loadingText = 'Удаление...' 
}: {
  onConfirm: () => void
  onCancel: () => void
  initialFocusRef: RefObject<HTMLButtonElement | null>
  isDeletingAccount?: boolean
  confirmText?: string
  loadingText?: string
}) => (
  <div className={styles['modal-delete-content__footer']}>
    <button 
      ref={initialFocusRef}
      type='button'
      className={cx(isDeletingAccount ? 
        'confirm-delete-button confirm-delete-button_disabled' : 
        'confirm-delete-button'
      )}
      onClick={onConfirm}
      disabled={isDeletingAccount}
    >
      {isDeletingAccount ? loadingText : confirmText}
    </button>
    <button 
      type='button'
      className='confirm-cancel-button'
      onClick={onCancel}
      disabled={isDeletingAccount}
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
  initialFocusRef,
  isDeletingAccount
}: {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  initialFocusRef: RefObject<HTMLButtonElement | null>
  isDeletingAccount: boolean
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
        isDeletingAccount={isDeletingAccount}
        confirmText='Удалить'
        loadingText='Удаление...'
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
  description,
  isDeletingAccount = false 
}: IConfirmModal) => {
  const portalElement = usePortal(portalId, isOpen)
  const btnYesRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById(modalId)
      if (modal && e.target === modal && !isDeletingAccount) {
        onCancel()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeletingAccount) {
        onCancel()
      }
    }

    if (isOpen) {
      if (!isDeletingAccount) {
        btnYesRef.current?.focus()
      }
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
  }, [isOpen, onCancel, modalId, portalId, isDeletingAccount])

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
        isDeletingAccount={isDeletingAccount}
      />
    </div>,
    portalElement
  )
}

export default ConfirmModal


