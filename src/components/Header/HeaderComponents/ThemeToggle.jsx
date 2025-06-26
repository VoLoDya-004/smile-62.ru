import Tippy from '@tippyjs/react'
import { useEffect } from 'react'
import 'tippy.js/dist/tippy.css'
import React from 'react'


export default React.memo(function ThemeToggle() {

  function changeThemeAdd() {
    document.querySelectorAll('.card').forEach(box => box.classList.add("dark-theme"))
    document.getElementById('search__line_line')?.classList.add("dark-theme")
    document.querySelector('.menu-mobile')?.classList.add("dark-theme")
    document.querySelectorAll('.section__item_style').forEach(section => section.classList.add("dark-theme"))
    document.querySelectorAll('.link__item').forEach(elem => elem.classList.add("dark-theme"))
    document.querySelector('.navbar')?.classList.add("dark-theme")
  }

  function changeThemeRemove() {
    document.querySelectorAll('.card').forEach(box => box.classList.remove("dark-theme"))
    document.getElementById('search__line_line')?.classList.remove("dark-theme")
    document.querySelector('.menu-mobile')?.classList.remove("dark-theme")
    document.querySelectorAll('.section__item_style').forEach(section => section.classList.remove("dark-theme"))
    document.querySelectorAll('.link__item').forEach(elem => elem.classList.remove("dark-theme"))
    document.querySelector('.navbar')?.classList.remove("dark-theme")
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark-theme") {
      document.body.classList.add("dark-theme")
      changeThemeAdd()
    } else {
      document.body.classList.remove("dark-theme")
      changeThemeRemove()
      localStorage.setItem("theme", "light-theme")
    }
  }, [])

  function changeTheme() {
    const isDark = document.body.classList.toggle("dark-theme")
    if (isDark) {
      localStorage.setItem("theme", "dark-theme")
      changeThemeAdd()
    } else {
      localStorage.setItem("theme", "light-theme")
      changeThemeRemove()
    }
  }

  
  return (
    <Tippy content="Сменить тему" placement={'left'} theme='lilac'>
      <button id="themeToggle" onClick={changeTheme}>
        <img src="/src/assets/images/icons/tema.png" style={{ width: "16px" }} className="themeToggle" />
      </button>
    </Tippy>
  )
})
