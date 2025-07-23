import Tippy from '@tippyjs/react'
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import React from 'react'


export default React.memo(function ThemeToggle() {
  const location = useLocation()

  function changeThemeAdd() {
    document.querySelectorAll('.card').forEach(box => box.classList.add("dark-theme"))
    document.querySelectorAll('.recommendationCard').forEach(box => box.classList.add("dark-theme"))
    document.querySelectorAll('.modal-contentBasket').forEach(box => box.classList.add("dark-theme"))
    document.querySelectorAll('.count__up').forEach(box => box.classList.add("dark-theme"))
    document.querySelectorAll('.count__down').forEach(box => box.classList.add("dark-theme"))
    document.querySelectorAll('.modal-contentBasket__title').forEach(box => box.classList.add("dark-theme"))
    document.querySelectorAll('.basketBox__product_controls').forEach(box => box.classList.add("dark-theme"))
    document.querySelector('.footer')?.classList.add("dark-theme")
    document.querySelector('.basketDelivery')?.classList.add("dark-theme")
    document.querySelector('.basketDelivery__right')?.classList.add("dark-theme")
    document.querySelector('.basketDelivery__left')?.classList.add("dark-theme")
    document.querySelector('.setka')?.classList.add("dark-theme")
    document.querySelector('.favouritesBox__table_header')?.classList.add("dark-theme")
    document.querySelector('.basketBox__table_header')?.classList.add("dark-theme")
    document.querySelector('.basketBox__footer')?.classList.add("dark-theme")
    document.querySelector('.support__header')?.classList.add("dark-theme")
    document.querySelector('.support__main')?.classList.add("dark-theme")
    document.querySelector('.support__footer')?.classList.add("dark-theme")
    document.querySelector('.support__footer_message')?.classList.add("dark-theme")
    document.querySelector('.recommendation__box')?.classList.add("dark-theme")
    document.querySelector('.basket__empty')?.classList.add("dark-theme")
    document.querySelectorAll('.form__registration')?.forEach(box => box.classList.add("dark-theme"))
    document.getElementById('search__line_line')?.classList.add("dark-theme")
    document.querySelector('.menu-mobile')?.classList.add("dark-theme")
    document.querySelectorAll('.section__item_style').forEach(section => section.classList.add("dark-theme"))
    document.querySelectorAll('.link__item').forEach(elem => elem.classList.add("dark-theme"))
    document.querySelector('.navbar')?.classList.add("dark-theme")
  }

  function changeThemeRemove() {
    document.querySelectorAll('.card').forEach(box => box.classList.remove("dark-theme"))
    document.querySelectorAll('.recommendationCard').forEach(box => box.classList.remove("dark-theme"))
    document.querySelectorAll('.modal-contentBasket').forEach(box => box.classList.remove("dark-theme"))
    document.querySelectorAll('.count__up').forEach(box => box.classList.remove("dark-theme"))
    document.querySelectorAll('.count__down').forEach(box => box.classList.remove("dark-theme"))
    document.querySelectorAll('.modal-contentBasket__title').forEach(box => box.classList.remove("dark-theme"))
    document.querySelectorAll('.basketBox__product_controls').forEach(box => box.classList.remove("dark-theme"))
    document.querySelector('.footer')?.classList.remove("dark-theme")
    document.querySelector('.basketDelivery')?.classList.remove("dark-theme")
    document.querySelector('.basketDelivery__right')?.classList.remove("dark-theme")
    document.querySelector('.basketDelivery__left')?.classList.remove("dark-theme")
    document.querySelector('.setka')?.classList.remove("dark-theme")
    document.querySelector('.favouritesBox__table_header')?.classList.remove("dark-theme")
    document.querySelector('.basketBox__table_header')?.classList.remove("dark-theme")
    document.querySelector('.basketBox__footer')?.classList.remove("dark-theme")
    document.querySelector('.support__header')?.classList.remove("dark-theme")
    document.querySelector('.support__main')?.classList.remove("dark-theme")
    document.querySelector('.support__footer')?.classList.remove("dark-theme")
    document.querySelector('.support__footer_message')?.classList.remove("dark-theme")
    document.querySelector('.recommendation__box')?.classList.remove("dark-theme")
    document.querySelector('.basket__empty')?.classList.remove("dark-theme")
    document.querySelectorAll('.form__registration')?.forEach(box => box.classList.remove("dark-theme"))
    document.getElementById('search__line_line')?.classList.remove("dark-theme")
    document.querySelector('.menu-mobile')?.classList.remove("dark-theme")
    document.querySelectorAll('.section__item_style').forEach(section => section.classList.remove("dark-theme"))
    document.querySelectorAll('.link__item').forEach(elem => elem.classList.remove("dark-theme"))
    document.querySelector('.navbar')?.classList.remove("dark-theme")
  }

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark-theme") {
      document.body.classList.add("dark-theme")
        changeThemeAdd() 
    } else {
      document.body.classList.remove("dark-theme")
        changeThemeRemove()
      localStorage.setItem("theme", "light-theme")
    }
  }, [location])

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
        <img src="/images/icons/tema.png" style={{ width: "16px" }} className="themeToggle" />
      </button>
    </Tippy>
  )
})




