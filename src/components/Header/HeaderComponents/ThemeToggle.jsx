import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

export default function ThemeToggle() {

  async function changeThemeAdd() {
  const boxes = document.querySelectorAll('.card')
  boxes.forEach(box => {
      box.classList.add("dark-theme")
  })
  await document.getElementById('search__line_line').classList.add("dark-theme")
  await document.querySelector('.menu-mobile').classList.add("dark-theme")
  const sections = document.querySelectorAll('.section__item_style')
  sections.forEach(section => {
    section.classList.add("dark-theme")
  })
  const element = document.querySelectorAll('.link__item')
  element.forEach(elem => {
      elem.classList.add("dark-theme")
  })
  document.querySelector('.navbar').classList.add("dark-theme")
}
async function changeThemeRemove() {
  const boxes = document.querySelectorAll('.card')
  boxes.forEach(box => {
      box.classList.remove("dark-theme")
  })
  await document.getElementById('search__line_line').classList.remove("dark-theme")
  await document.querySelector('.menu-mobile').classList.remove("dark-theme")
  const sections = document.querySelectorAll('.section__item_style')
  sections.forEach(section => {
    section.classList.remove("dark-theme")
  })
  const element = document.querySelectorAll('.link__item')
  element.forEach(elem => {
      elem.classList.remove("dark-theme")
  })
  document.querySelector('.navbar').classList.remove("dark-theme")
}

const theme = localStorage.getItem("theme")

  if (theme === "light-theme") {
    document.body.classList.remove("dark-theme")
    changeThemeRemove()
  } else {
    document.body.classList.add("dark-theme")
    changeThemeAdd()
  }

  function changeTheme () {
  document.body.classList.toggle("dark-theme")

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme")  
    changeThemeAdd()
  } else {
    localStorage.setItem("theme", "light-theme")
    changeThemeRemove()
}
}
  
  return (
      <>
      <Tippy content="Сменить тему" placement={'left'} theme='lilac'>
        <button id="themeToggle" onClick={changeTheme}>
				  <img src="/src/assets/images/icons/tema.png" style={{width: "16px"}} className="themeToggle"/>
		    </button>
      </Tippy>
      </>
    )
  }
