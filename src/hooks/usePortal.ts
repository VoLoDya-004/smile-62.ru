import { useEffect, useState } from 'react'

export const usePortal = (portalId: string, shouldCreate: boolean = false) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let element = document.getElementById(portalId)
    
    if (!element && shouldCreate) {
      element = document.createElement('div')
      element.id = portalId
      document.body.appendChild(element)
    }

    setPortalElement(element)

    return () => {
      if (element && element.parentNode && shouldCreate) {
        element.parentNode.removeChild(element)
      }
    }
  }, [portalId, shouldCreate])

  return portalElement
}