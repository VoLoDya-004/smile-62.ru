import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'
import type { ICategory } from '../../types/mainTypes'
import { useProductsContext } from '../../contexts/ProductsContext'
import { CATEGORIES } from '../../constants/categories'

interface ICategoriesDropdownProps {
  toggle: boolean
  visible: boolean
  onCategorySelect: () => void
}

const CategoriesDropdown = ({ 
  toggle, 
  visible, 
  onCategorySelect 
}: ICategoriesDropdownProps) => {
  const { 
    setSelectedCategory, 
    setCurrentPage,  
    selectedCategory,
    setSearchParams
  } = useProductsContext()

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const handleCategorySelect = (id: number) => {
    if (selectedCategory === id) {
      return
    }

    const newSearchParams = new URLSearchParams(window.location.search)

    if (id === 0) {
      newSearchParams.delete('category')
    } else {
      newSearchParams.set('category', id.toString())
    }

    setSearchParams(newSearchParams)

    setCurrentPage(1)
    setSelectedCategory(id)
    onCategorySelect()
  }

  return (
    <aside 
      className={
        isDarkTheme ? 
        `${toggle ? 'categories-dropdown' : ''} dark-theme` : 
        toggle ? 'categories-dropdown' : ''
      }
      aria-hidden={visible ? 'false' : 'true'}
      aria-label='Список категории товаров'
    >
      {CATEGORIES.map((cat: ICategory) => (
        <button
          key={cat.id}
          className={`
            categories-dropdown__item 
            ${visible ? 'display-block' : 'display-none'} 
            ${selectedCategory === cat.id ? 
              'categories-dropdown__item_active' : 
              'categories-dropdown__item_passive'
            }
            ${isDarkTheme ? ' dark-theme' : ''}
          `}
          id={cat.label}
          onClick={() => handleCategorySelect(cat.id)}
          tabIndex={visible ? 0 : -1} 
        >
          {cat.label}
        </button>
      ))}
    </aside>
  )
}

export default CategoriesDropdown
