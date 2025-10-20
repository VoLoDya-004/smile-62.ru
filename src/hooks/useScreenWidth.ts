import { useState, useEffect } from 'react'

function useScreenWidth(breakpoint = 1001) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoint)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isBelowBreakpoint
}

export default useScreenWidth