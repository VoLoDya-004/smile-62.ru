import { useEffect, useState } from 'react'
import { pluralize } from '@/shared/utils/pluralize'
import { CATEGORIES } from '../../constants/categories'
import type { ICategory } from '../../types/mainTypes'
import { cx } from '@/shared/utils/classnames'
import styles from './Breadcrumbs.module.scss'

interface BreadcrumbsProps {
  selectedCategory: number | null
  totalItems: number
  setSelectedCategory: (category: number) => void
  setCurrentPage: (page: number) => void
  fetchCards: () => void
  setSearchParams: (params: URLSearchParams) => void
}

const Breadcrumbs = ({
  selectedCategory,
  totalItems,
  setSelectedCategory,
  setCurrentPage,
  fetchCards,
  setSearchParams
}: BreadcrumbsProps) => {
  const {
    'breadcrumbs': breadcrumbs,
    'categories-name-main': nameCategoriesMain,
    'categories-name': nameCategories,
    'categories-name-slash': nameCategoriesSlash,
    'count-products': countProducts,
    'passive': passive
  } = styles

  const [categoriesName, setCategoriesName] = useState('Все категории')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    CATEGORIES.filter((cat: ICategory) => {
      if (cat.id === selectedCategory) {
        setCategoriesName(cat.label)
      }
    })
    if (selectedCategory === 0) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [selectedCategory, CATEGORIES])

  const allCategoriesBtn = () => {
    if (selectedCategory !== 0) {
      const newSearchParams = new URLSearchParams(window.location.search)

      newSearchParams.delete('category')

      setSearchParams(newSearchParams)
      setVisible(false)
      setSelectedCategory(0)
      setCurrentPage(1)
      fetchCards()         
    }
  }

  const itemText = pluralize(totalItems, ['товар', 'товара', 'товаров'])

  return (
    <nav className={breadcrumbs} aria-label='Навигация по категориям'>
      <button 
        onClick={allCategoriesBtn}
        className={cx(nameCategoriesMain, selectedCategory === 0 && passive)}
        tabIndex={selectedCategory === 0 ? -1 : 0}
      >
        Все категории{selectedCategory === 0 ? ' /' : '' } 
      </button>
      {visible && 
        <div className={nameCategories}>
          <div className={nameCategoriesSlash}>/</div>
          {categoriesName} /
        </div>
      }
      <div className={countProducts}> {totalItems} {itemText} </div>
    </nav>
  )
}

export default Breadcrumbs