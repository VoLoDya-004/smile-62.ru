import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useProductsContext } from '@/features/layout/products/contexts/ProductsContext'
import CategoriesDropdown from '@/features/layout/products/components/mainComponents/CategoriesDropdown'
import CrossSVG from '../icons/CrossSVG'
import MenuSVG from '../icons/MenuSVG'

const ButtonCategories = () => {
  const { setSelectedCategory } = useProductsContext()

  const [toggle, setToggle] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

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
    document.getElementById('blackout')?.classList.remove('blackout')
    document.body.classList.remove('modal-open')
  }

  const showCategoriesDropdown = () => {
    setToggle(true)
    setVisible(true)
    document.getElementById('blackout')?.classList.add('blackout')
    document.body.classList.add('modal-open')
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
    const handlePointerUp = (e: PointerEvent) => {
      let container = document.querySelector('.categories-dropdown')
      let navigationBtn = document.querySelector('[data-js-categories-button]')

      if (container && navigationBtn) {
        if ((!container.contains(e.target as Node)) && (!navigationBtn.contains(e.target as Node))) {
          closeCategoriesDropdown()
        } else {
          showCategoriesDropdown()
        }
      }
    }

    document.addEventListener('pointerup', handlePointerUp)
        
    return () => document.removeEventListener('pointerup', handlePointerUp)
  }, [])

  useEffect(() => {
    if (toggle) {
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const categoriesDropdown = document.querySelector('.categories-dropdown') as HTMLElement
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
      <div className='categories'>
        <button 
          type='button'
          className='categories__button' 
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
      />
    </>
  )
}

export default ButtonCategories








