import { useDeviceType } from '@/shared/hooks'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styles from './ThemeToggle.module.scss'
import { useTheme } from './useTheme'

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
          className={img}
          src='/images/icons/theme.svg'
          alt='Смена темы'
          width={16}
          height={16}
        />
      </button>
    </Tippy>
  )
}

export default ThemeToggle





