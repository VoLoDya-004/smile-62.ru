import type { ReactNode } from 'react'
import { useModals, useNotification } from '../hooks'
import { UIContext } from '../contexts/UIContext'

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const notification = useNotification()
  const modals = useModals()

  const value = {
    notification: notification,
    modals: modals
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}