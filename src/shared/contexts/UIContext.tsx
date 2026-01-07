import { createContext, useContext } from 'react'
import { useNotification, useModals } from '../hooks/index'

interface IUIContextType {
  notification: ReturnType<typeof useNotification>
  modals: ReturnType<typeof useModals>
}

export const UIContext = createContext<IUIContextType | undefined>(undefined)

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