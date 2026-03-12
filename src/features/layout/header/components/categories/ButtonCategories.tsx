import { useFocusTrap } from '@/shared/hooks'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useProductsContext } from '@/features/layout/products/providers/ProductsProvider'
import { useUIContextModals } from '@/shared/providers/UIProvider'
import CategoriesDropdown from '@/features/layout/products/components/categoriesDropdown/CategoriesDropdown'
import CrossSVG from '@/shared/ui/icons/CrossSVG'
import MenuSVG from '@/shared/ui/icons/MenuSVG'
import styles from './Categories.module.scss'

const ButtonCategories = () => {
  const {
    'categories': categories,
    'categories-button': categoriesButton
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
    const categoryFromUrl = searchParams.get('categoryProducts')

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

  useFocusTrap(toggle, categoriesDropdownRef, closeCategoriesDropdown)

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





