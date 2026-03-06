import { createPortal } from 'react-dom'
import { usePortal } from '@/shared/hooks'
import { cx } from '@/shared/utils/classnames'
import { useEffect, useRef, type FormEvent } from 'react'
import { useUIContextNotification } from '@/shared/providers/UIProvider'
import ButtonCross from '@/shared/ui/buttons/ButtonCross'
import styles from './Support.module.scss'
import { useModalFocusTrap } from '@/shared/hooks/shared/useModalFocusTrap'

interface ISupportProps {
  isOpen: boolean
  onClose: () => void
}

const SupportHeader = ({ onClose }: { onClose: () => void }) => {
  const {
    'support__header': supportHeader,
    'support__header-title': supportHeaderTitle
  } = styles

  return (
    <header className={supportHeader}>
      <h3 className={cx(supportHeaderTitle, 'margin-null')}>Поддержка</h3>
      <ButtonCross
        className='button-cross'
        id='button-cross'
        onClick={onClose}
      />
    </header>
  )
}

const SendIcon = () => (
  <svg className='svg-btn-fill-none' xmlns='http://www.w3.org/2000/svg'>
    <path 
      className='white-fill-clip'
      d='M12 20.5a1 1 0 0 0 1-1V6.414l4.293 4.293a1 1 0 0 0 
      1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 
      1.414L11 6.414V19.5a1 1 0 0 0 1 1Z'
    />
  </svg>
)

const SupportForm = () => {
  const {
    'support__footer': supportFooter,
    'support__footer-message': supportFooterMessage
  } = styles

  const { showNotification } = useUIContextNotification()

  const handleSendToSupport = (e: FormEvent) => {
    e.preventDefault()
    showNotification('Фунционал в разработке', 'error')
  }

  return (
    <form className={supportFooter}>
      <textarea 
        className={supportFooterMessage} 
        name='support'
        placeholder='Ваше сообщение...' 
        spellCheck='false'
        required
      />
      <button 
        className='button-support-message' 
        type='submit'
        aria-label='Отправить сообщение в поддержку'
        onClick={handleSendToSupport}
      >
        <SendIcon />
      </button>
    </form>
  )
}

const Support = ({ isOpen, onClose }: ISupportProps) => {
  const {
    'support': support,
    'support__main': supportMain,
    'confirm-modal-chat': confirmModalChat
  } = styles

  const portalElement = usePortal('confirm-modal-chat', isOpen)
  const prevPortalElemenRef = useRef<HTMLElement | null>(null)

  useModalFocusTrap(isOpen, onClose, 'confirm-modal-chat')

  const closeModal = () => onClose()

  useEffect(() => {
    if (portalElement && prevPortalElemenRef.current !== portalElement) {
      portalElement.className = confirmModalChat
      prevPortalElemenRef.current = portalElement
    }
  }, [portalElement, confirmModalChat])

  if (!portalElement || !isOpen) {
    return null
  }

  return createPortal(
    <section 
      className={support} 
      role='dialog' 
      aria-modal='true' 
      tabIndex={-1}
    >
      <SupportHeader onClose={closeModal} />
      <section className={supportMain} />
      <SupportForm />
    </section>,
    portalElement
  )
}

export default Support