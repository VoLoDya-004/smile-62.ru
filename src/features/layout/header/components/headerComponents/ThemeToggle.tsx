import { useDispatch, useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import { setIsDarkTheme } from '@/shared/store/slices/ThemeSlice'
import { useDeviceType } from '@/shared/hooks'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
  
  const toggleTheme = () => {
    dispatch(setIsDarkTheme(!isDarkTheme))
  }

  const { isMobile } = useDeviceType()

  return (
    <Tippy 
      content='Сменить тему' 
      placement={'left'} 
      theme='lilac'
      disabled={isMobile}
    >
      <button 
        type='button'
        className='theme-toggle__button' 
        onClick={toggleTheme}
        aria-label='Смена темы'
      >
        <img 
          src='/images/icons/theme.png' 
          alt='Смена темы'
          className='theme-toggle__img' 
        />
      </button>
    </Tippy>
  )
}

export default ThemeToggle





