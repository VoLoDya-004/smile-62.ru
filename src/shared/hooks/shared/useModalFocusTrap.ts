import { useEffect } from 'react'

export const useModalFocusTrap = (
  isOpen: boolean,
  onClose: () => void,
  modalId: string,
  closeOnClickOutside: boolean = true
) => {
  useEffect(() => {
    const modal = document.getElementById(modalId)
    if (!isOpen || !modal) return

    const lastActive = document.activeElement as HTMLElement

    document.body.style.overflow = 'hidden'

    const allChildren = Array.from(document.body.children)
    allChildren.forEach(child => {
      if (child.id !== modalId) {
        child.setAttribute('inert', '')
      }
    })

    requestAnimationFrame(() => {
      const focusable = modal.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable) focusable.focus()
    })

    const handleClickOutside = (e: MouseEvent) => {
      if (closeOnClickOutside && e.target === modal) {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    modal.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleTab)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      modal.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleTab)
      document.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = 'unset'

      allChildren.forEach(child => {
        child.removeAttribute('inert')
      })

      if (lastActive) {
        lastActive.focus()
      }
    }
  }, [isOpen, onClose, modalId, closeOnClickOutside])
}