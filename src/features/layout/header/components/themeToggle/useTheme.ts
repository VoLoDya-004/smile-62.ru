import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
  })

  const toggleTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme)

    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

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

  return { toggleTheme }
}