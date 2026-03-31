import { useEffect, useState } from 'react'
import { pluralize } from '@/shared/utils/pluralize'
import { CATEGORIES } from '../../constants/categories'
import type { ICategory } from '../../types/mainTypes'
import { cx } from '@/shared/utils/classnames'
import styles from './Breadcrumbs.module.scss'
import { useRouter } from 'next/navigation'

interface BreadcrumbsProps {
  selectedCategory: number | null
  totalItems: number
}

const Breadcrumbs = ({ selectedCategory, totalItems }: BreadcrumbsProps) => {
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

  const router = useRouter()

  useEffect(() => {
    const foundCategory = CATEGORIES.find((cat: ICategory) => cat.id === selectedCategory)
    if (foundCategory) {
      setCategoriesName(foundCategory.label)
    } else {
      setCategoriesName('Все категории')
    }
    
    setVisible(selectedCategory !== null && selectedCategory !== 0)
  }, [selectedCategory])
  
  const allCategoriesBtn = () => {
    if (selectedCategory === 0 || selectedCategory === null) return

    const currentParams = new URLSearchParams(window.location.search)
    currentParams.delete('categoryProducts')  
    const newUrl = currentParams.toString() ? `?${currentParams.toString()}` : '/'

    router.push(newUrl, { scroll: false })
  }

  const itemText = pluralize(totalItems, ['товар', 'товара', 'товаров'])
  const isAllCategoriesActive = selectedCategory === 0 || selectedCategory === null

  return (
    <nav className={breadcrumbs} aria-label='Навигация по категориям'>
      <button 
        onClick={allCategoriesBtn}
        className={cx(nameCategoriesMain, isAllCategoriesActive && passive)}
        tabIndex={isAllCategoriesActive ? -1 : 0}
      >
        Все категории{isAllCategoriesActive ? ' /' : ''}
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