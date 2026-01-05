import { useDeviceType, useTheme } from '@/shared/hooks'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styles from '../Header.module.scss'

const ThemeToggle = () => {
  const {
    'theme-toggle__button': button,
    'theme-toggle__img': img
  } = styles

  const { toggleTheme } = useTheme()
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
        className={button}
        onClick={toggleTheme}
        aria-label='Смена темы'
      >
        <img 
          src='/images/icons/theme.png' 
          alt='Смена темы'
          className={img}
        />
      </button>
    </Tippy>
  )
}

export default ThemeToggle





