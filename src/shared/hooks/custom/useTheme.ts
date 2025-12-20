import type { RootStore } from '@/shared/store'
import { setIsDarkTheme } from '@/shared/store/slices/ThemeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useTheme = () => {
  const dispatch = useDispatch()
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    dispatch(setIsDarkTheme(theme === 'dark-theme'))
  }, [dispatch])

  useEffect(() => {
    const themeColor = isDarkTheme ? '#121212' : '#ffffff'
    const statusBarStyle = isDarkTheme ? 'black-translucent' : 'default'
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor)
    } else {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      metaThemeColor.setAttribute('content', themeColor)
      document.head.appendChild(metaThemeColor)
    }
    
    let metaApple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')

    if (metaApple) {
      metaApple.setAttribute('content', statusBarStyle)
    } else {
      metaApple = document.createElement('meta')
      metaApple.setAttribute('name', 'apple-mobile-web-app-status-bar-style')
      metaApple.setAttribute('content', statusBarStyle)
      document.head.appendChild(metaApple)
    } 
  }, [isDarkTheme])
}