import { memo, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Context } from '@/contexts/context'
import type { RootStore } from '@/redux'
import type { ICategory } from '@/types/types'


interface ICategoriesDropdownProps {
  toggle: string
  visible: string
  onCategorySelect: () => void
}


const CategoriesDropdown = ({ 
  toggle, 
  visible, 
  onCategorySelect 
}: ICategoriesDropdownProps) => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context must be used within a Provider')
  }
  const { 
    setSelectedCategory, 
    setCurrentPage,  
    categories, 
    selectedCategory,
    setSearchParams
  } = context

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
      className={isDarkTheme ? `${toggle} dark-theme` : toggle}
      aria-hidden={visible === 'display-block' ? 'false' : 'true'}
      aria-label='Список категории товаров'
    >
      {categories.map((cat: ICategory) => (
        <button
          key={cat.id}
          className={`
            categories-dropdown__item ${visible} 
            ${selectedCategory === cat.id ? 
              'categories-dropdown__item_active' : 
              'categories-dropdown__item_passive'
            }
            ${isDarkTheme ? ' dark-theme' : ''}
          `}
          id={cat.label}
          onClick={() => handleCategorySelect(cat.id)}
          tabIndex={visible === 'display-block' ? 0 : -1} 
        >
          {cat.label}
        </button>
      ))}
    </aside>
  )
}

export default memo(CategoriesDropdown)
