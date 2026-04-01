import { forwardRef } from 'react'
import type { ICategory } from '../../types/mainTypes'
import { useProductsContext } from '../../providers/ProductsProvider'
import { CATEGORIES } from '../../constants/categories'
import { cx } from '@/shared/utils/classnames'
import styles from './CategoriesDropdown.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'

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

  const { selectedCategory } = useProductsContext()

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategorySelect = (id: number) => {
    const currentPath = window.location.pathname
    const params = new URLSearchParams(searchParams?.toString() || '')

    if (id === 0) {
      params.delete('categoryProducts')
    } else {
      params.set('categoryProducts', id.toString())
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/'

    if (currentPath !== '/') {
      router.push(`/${newUrl}`)
    } else {
      router.push(newUrl, { scroll: false })
    }
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
              selectedCategory === cat.id ? categoriesDropdownItemActive : categoriesDropdownItemPassive
            )
          }
          style={{ display: visible ? 'flex' : 'none' }}
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
