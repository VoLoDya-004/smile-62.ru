import Tippy from '@tippyjs/react'
import { useDispatch, useSelector } from 'react-redux'
import {setIsDarkTheme} from '../../../redux/ThemeSlice'
import 'tippy.js/dist/tippy.css'
import React from 'react'


export default React.memo(function ThemeToggle() {
  const dispatch = useDispatch()

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)
  
  const toggleTheme =  () => {
    dispatch(setIsDarkTheme(!isDarkTheme))
  }

  
  return (
    <Tippy content="Сменить тему" placement={'left'} theme='lilac'>
      <button id="themeToggle" onClick={toggleTheme}>
        <img src="/images/icons/tema.png" style={{ width: "16px" }} className="themeToggle" />
      </button>
    </Tippy>
  )
})




