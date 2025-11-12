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


const SupportHeader = ({ 
  isDarkTheme, 
  onClose 
}: { 
  isDarkTheme: boolean
  onClose: () => void 
}) => (
  <header className={`support__header ${isDarkTheme ? 'dark-theme' : ''}`}>
    <h3 className='support__header-title margin-null'>Поддержка</h3>
    <ButtonCross
      className='button-cross'
      id='button-cross'
      onClick={onClose}
    />
  </header>
)

const SendIcon = () => (
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
)

const SupportForm = ({ 
  isDarkTheme 
}: { 
  isDarkTheme: boolean 
}) => (
  <form 
    method='post'
    className={`support__footer ${isDarkTheme ? 'dark-theme' : ''}`} 
  >
    <textarea 
      className={`support__footer-message ${isDarkTheme ? 'dark-theme' : ''}`} 
      name='support'
      placeholder='Ваше сообщение...' 
      spellCheck='false'
      required
    />
    <button 
      className='button-support-message' 
      type='submit'
      aria-label='Отправить сообщение в поддержку'
    >
      <SendIcon />
    </button>
  </form>
)

const useModalAccessibility = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const modal = document.getElementById('confirm-modal-chat')
        
    if (!isOpen || !modal) return

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === modal) {
        onClose()
        document.body.classList.remove('modal-open')
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        document.body.classList.remove('modal-open')
      }
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
            
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
            
      if (focusableElements.length === 0) return

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

    const allChildren = Array.from(document.body.children)
    allChildren.forEach(child => {
      if (child.id !== 'confirm-modal-chat') {
        child.setAttribute('inert', '')
      }
    })

    modal.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleTab)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      modal.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleTab)
      document.removeEventListener('keydown', handleKeyDown)

      allChildren.forEach(child => {
        child.removeAttribute('inert')
      })
    }
  }, [isOpen, onClose])
}

const Support = ({ isOpen, onClose }: SupportProps) => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
  const portalElement = usePortal('confirm-modal-chat', isOpen)

  useModalAccessibility(isOpen, onClose)

  const closeModal = () => {
    onClose()
    document.body.classList.remove('modal-open')
  }

  if (!portalElement || !isOpen) {
    return null
  }


  return createPortal(
    <section 
      className='support' 
      role='dialog' 
      aria-modal='true' 
      tabIndex={-1}
    >
      <SupportHeader 
        isDarkTheme={isDarkTheme} 
        onClose={closeModal} 
      />
      <section className={`support__main ${isDarkTheme ? 'dark-theme' : ''}`} />
      <SupportForm isDarkTheme={isDarkTheme} />
    </section>,
    portalElement
  )
}

export default Support