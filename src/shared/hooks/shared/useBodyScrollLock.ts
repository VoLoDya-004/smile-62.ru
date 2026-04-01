import { useEffect } from 'react'

export const useBodyScrollLock = (isLocked: boolean, paddingRight: string = '10px') => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isLocked) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = paddingRight
    } else {
      document.body.style.overflow = 'visible'
      document.body.style.paddingRight = '0'
    }
    
    return () => {
      document.body.style.overflow = 'visible'
      document.body.style.paddingRight = '0'
    }
  }, [isLocked, paddingRight])
}