import { useState, memo, useContext, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '@/contexts/context'
import CategoriesDropdown from '../sub-components/CategoriesDropdown'


const ButtonCategories = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { setSelectedCategory } = context

  const [toggle, setToggle] = useState<string>('')
  const [image, setImage] = useState<string>('/images/icons/nav.png')
  const [visible, setVisible] = useState<string>('display-none')

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
    setToggle('')
    setImage('/images/icons/nav.png')
    setVisible('display-none')
    document.getElementById('blackout')?.classList.remove('blackout')
    document.body.classList.remove('modal-open')
  }

  const showCategoriesDropdown = () => {
    setToggle('categories-dropdown')
    setImage('/images/icons/cross.png')
    setVisible('display-block')
    document.getElementById('blackout')?.classList.add('blackout')
    document.body.classList.add('modal-open')
  }

  function nav() {
    if (location.pathname !== '/') {
      navigate('/')
    }
    if (toggle === '') {
      showCategoriesDropdown()
    } else {
      closeCategoriesDropdown()
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
    if (toggle === 'categories-dropdown') {
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
          aria-label={visible === 'display-block' ? 
            'Закрыть меню категорий товаров' : 
            'Открыть меню категорий товаров'
          }
        >
          <img 
            src={image} 
            alt='Категории товаров'
            className='categories__img'
          />
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

export default memo(ButtonCategories)








