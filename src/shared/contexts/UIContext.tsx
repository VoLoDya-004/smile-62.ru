import { createContext, useContext, type ReactNode } from 'react'
import { useNotification, useModals } from '../hooks/index'

interface IUIContextType {
  notification: ReturnType<typeof useNotification>
  modals: ReturnType<typeof useModals>
}

const UIContext = createContext<IUIContextType | undefined>(undefined)

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const notification = useNotification()
  const modals = useModals()

  const value = {
    notification: notification,
    modals: modals
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

const useUIContext = () => {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUIContext must be used within UIProvider')
  return context
}

export const useUIContextNotification = () => {
  const { notification } = useUIContext()
  return notification 
}

export const useUIContextModals = () => {
  const { modals } = useUIContext()
  return modals
}