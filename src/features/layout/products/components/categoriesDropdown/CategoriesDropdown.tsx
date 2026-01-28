import { forwardRef } from 'react'
import type { ICategory } from '../../types/mainTypes'
import { useProductsContext } from '../../providers/ProductsProvider'
import { CATEGORIES } from '../../constants/categories'
import { cx } from '@/shared/utils/classnames'
import styles from './CategoriesDropdown.module.scss'

interface ICategoriesDropdownProps {
  toggle: boolean
  visible: boolean
  onCategorySelect: () => void
}

const CategoriesDropdown = forwardRef<HTMLElement, ICategoriesDropdownProps>(({ 
  toggle, 
  visible, 
  onCategorySelect 
}, ref) => {
  const {
    'categories-dropdown': categoriesDropdown,
    'categories-dropdown__item': categoriesDropdownItem,
    'categories-dropdown__item_active': categoriesDropdownItemActive,
    'categories-dropdown__item_passive': categoriesDropdownItemPassive
  } = styles

  const { setSelectedCategory, selectedCategory, setSearchParams } = useProductsContext()

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
    setSelectedCategory(id)
    onCategorySelect()
  }

  return (
    <aside 
      ref={ref}
      className={cx(toggle && categoriesDropdown)}
      aria-hidden={visible ? 'false' : 'true'}
      aria-label='Список категории товаров'
    >
      {CATEGORIES.map((cat: ICategory) => (
        <button
          key={cat.id}
          className={
            cx(
              categoriesDropdownItem,
              visible ? 'display-block' : 'display-none',
              selectedCategory === cat.id ? 
                categoriesDropdownItemActive :
                categoriesDropdownItemPassive
            )
          }
          id={cat.label}
          onClick={() => handleCategorySelect(cat.id)}
          tabIndex={visible ? 0 : -1} 
        >
          {cat.label}
        </button>
      ))}
    </aside>
  )
})

export default CategoriesDropdown
