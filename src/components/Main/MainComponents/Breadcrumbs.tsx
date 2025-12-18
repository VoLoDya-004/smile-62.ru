import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootStore } from '@/redux'
import { pluralize } from '@/utils/pluralize'
import { CATEGORIES } from '@/constants/categories'

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
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const [categoriesName, setCategoriesName] = useState('Все категории')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    CATEGORIES.filter(cat => {
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
    <nav 
      className='breadcrumbs'
      aria-label='Навигация по категориям'
    >
      <button 
        onClick={allCategoriesBtn}
        className={`
          categories-name-main 
          ${isDarkTheme ? 'dark-theme' : ''} 
          ${selectedCategory === 0 ? 'passive' : '' }
        `}
        tabIndex={selectedCategory === 0 ? -1 : 0}
      >
        Все категории{selectedCategory === 0 ? ' /' : '' } 
      </button>
      {visible && 
        <div className='categories-name'>
          <div className='categories-name-slash'>/</div>
          {categoriesName} /
        </div>
      }
      <div className='count-products'> {totalItems} {itemText} </div>
    </nav>
  )
}

export default Breadcrumbs