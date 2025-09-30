import { useDispatch, useSelector } from 'react-redux'
import {setIsDarkTheme} from '../../../redux/ThemeSlice'
import { memo } from 'react'
import type { RootStore } from '../../../redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'


const ThemeToggle = () => {
  const dispatch = useDispatch()

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)
  
  const toggleTheme =  () => {
    dispatch(setIsDarkTheme(!isDarkTheme))
  }

  
  return (
    <Tippy 
      content='Сменить тему' 
      placement={'left'} 
      theme='lilac'
    >
      <button 
        type='button'
        id='theme-toggle' 
        onClick={toggleTheme}
      >
        <span className='visually-hidden'>Сменить тему</span>
        <img 
          src='/images/icons/theme.png' 
          alt='Смена темы'
          className='theme-toggle' 
        />
      </button>
    </Tippy>
  )
}

export default memo(ThemeToggle)




