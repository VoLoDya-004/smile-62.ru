import type { ReactNode } from 'react'
import { useModals } from '../widgets/modals/hooks/useModals'
import { useNotification } from '../widgets/notification/hooks/useNotification'
import { createContext, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '../store'

interface IUIContextType {
  notification: ReturnType<typeof useNotification>
  modals: ReturnType<typeof useModals>
}

const UIContext = createContext<IUIContextType | undefined>(undefined)

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

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const notification = useNotification()
  const modals = useModals()

  const isAuth = useSelector((state: RootStore) => state.user.isAuth)

  useEffect(() => {
    if (!isAuth && modals.isDeleteAccountModalOpen) {
      modals.closeDeleteAccountModal()
    }
  }, [isAuth, modals])

  const value = {
    notification: notification,
    modals: modals
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}