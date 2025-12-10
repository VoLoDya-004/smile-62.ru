import type { INotificationData } from '@/types/types'
import { useEffect, useState } from 'react'

export const useNotification = () => {
  const [notification, setNotification] = useState<INotificationData | null>(null)
  
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type })
  }
  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  return {
    notification,
    setNotification,
    showNotification,
  }
}