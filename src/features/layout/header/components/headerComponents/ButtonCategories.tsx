import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useProductsContext } from '@/features/layout/products/contexts/ProductsContext'
import { useUIContextModals } from '@/shared/contexts/UIContext'
import CategoriesDropdown from '@/features/layout/products/components/categoriesDropdown/CategoriesDropdown'
import CrossSVG from '@/shared/ui/icons/CrossSVG'
import MenuSVG from '@/shared/ui/icons/MenuSVG'
import styles from '../Header.module.scss'

const ButtonCategories = () => {
  const {
    'categories': categories,
    'categories__button': categoriesButton
  } = styles

  const { setSelectedCategory } = useProductsContext()
  const { setIsCategoriesProductOpen } = useUIContextModals()

  const [toggle, setToggle] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const categoriesDropdownRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')

    if (categoryFromUrl) {
      const categoryId = parseInt(categoryFromUrl)
      if (!isNaN(categoryId)) {
        setSelectedCategory(categoryId)
      } else {
        setSelectedCategory(0)
      }
    }
  }, [searchParams, setSelectedCategory])

  const closeCategoriesDropdown = () => {
    setToggle(false)
    setVisible(false)
    setIsCategoriesProductOpen(false)
  }

  const showCategoriesDropdown = () => {
    setToggle(true)
    setVisible(true)
    setIsCategoriesProductOpen(true)
  }

  function nav() {
    if (location.pathname !== '/') {
      navigate('/')
    }
    if (toggle) {
      closeCategoriesDropdown()
    } else {
      showCategoriesDropdown()
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        closeCategoriesDropdown()
      }  
    }

    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (toggle) {
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const categoriesDropdown = categoriesDropdownRef.current
          const navButton = document.querySelector('[data-js-categories-button]') as HTMLElement
          
          if (!categoriesDropdown || !navButton) return
                    
          const focusableElements = [
            navButton,
            ...Array.from(categoriesDropdown.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )) as HTMLElement[]
          ]
                    
          if (focusableElements.length === 0) return
                    
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]
                    
          if (!focusableElements.includes(document.activeElement as HTMLElement)) {
            e.preventDefault()
            if (e.shiftKey) {
              lastElement.focus()
            } else {
              firstElement.focus()
            }
          } else if (document.activeElement === lastElement && !e.shiftKey) {
            e.preventDefault()
            firstElement.focus()
          } else if (document.activeElement === firstElement && e.shiftKey) {
            e.preventDefault()
            lastElement.focus()
          }
        }
                
        if (e.key === 'Escape') {
          closeCategoriesDropdown()
        }
      }
            
      document.addEventListener('keydown', handleTabKey)
            
      const timer = setTimeout(() => {
        const navButton = document.querySelector('[data-js-categories-button]') as HTMLElement

        if (navButton) {
          navButton.focus()
        }
      }, 100)
            
      return () => {
        document.removeEventListener('keydown', handleTabKey)
        clearTimeout(timer)
      }
    }
  }, [toggle])

  return (
    <>
      <div className={categories}>
        <button 
          ref={buttonRef}
          type='button'
          className={categoriesButton}
          data-js-categories-button
          onClick={nav} 
          aria-label={visible ? 
            'Закрыть меню категорий товаров' : 
            'Открыть меню категорий товаров'
          }
        >
          {visible ? <CrossSVG /> : <MenuSVG />}
        </button>
      </div>   
      <CategoriesDropdown 
        toggle={toggle}
        visible={visible}
        onCategorySelect={closeCategoriesDropdown}
        ref={categoriesDropdownRef}
      />
    </>
  )
}

export default ButtonCategories





