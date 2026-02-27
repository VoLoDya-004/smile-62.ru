import { cx } from '@/shared/utils/classnames'
import { useEffect, useRef, useState } from 'react'
import { useProductsContext } from '../../providers/ProductsProvider'
import { useUIContextModals } from '@/shared/providers/UIProvider'
import Button from '@/shared/ui/buttons/Button'
import SortMenu from './sortMenu/SortMenu'
import FiltersMenu from './filtersMenu/FiltersMenu'
import styles from './FiltersBlock.module.scss'

const FiltersBlock = () => {
  const {
    'filters-block': filtersBlock,
    'filters-block__sort': filtersBlockSort,
    'filters-block__sort-title': filtersBlockSortTitle,
    'filters-block__sort-triangle-padding': sortTriangle,
    'filters-block__sort-triangle-padding_up': sortTriangleUp,
    'filters-block__filter': filtersBlockFilter,
    'sort-title': sortTitle
  } = styles

  const { setSortType, handleFiltersChange, currentSort, setCurrentSort } = useProductsContext()
  const { setIsFiltersProductOpen } = useUIContextModals()

  const [visibleSort, setVisibleSort] = useState(false)
  const [visibleFilters, setVisibleFilters] = useState(false)

  const menuSortRef = useRef<HTMLFormElement | null>(null)
  const menuFiltersRef = useRef<HTMLElement | null>(null)
  const sortButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleToggleFilters = () => {
    setVisibleFilters(prev => !prev)

    if (visibleFilters) {
      setIsFiltersProductOpen(false)
    } else {
      setIsFiltersProductOpen(true)
    }
  }

  const handleSortSelect = (sortOption: string) => {
    setSortType(sortOption)
    setCurrentSort(
      sortOption === 'default' ? 'По умолчанию' :
      sortOption === 'cheap' ? 'Дешевле' : 
      sortOption === 'expensive' ? 'Дороже' : 
      'По скидке (%)'
    )  
  }

  const handleCloseSortMenu = () => {
    setVisibleSort(false)
  }

  const handleResetFilters = () => {
    handleFiltersChange({
      minPrice: null,
      maxPrice: null,
      actions: {
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
        action7: false,
        action8: false,
      }
    })
  }

  useEffect(() => {
  const handleClickOutsideSort = (e: PointerEvent) => {
    const isOutsideMenu = menuSortRef.current && !menuSortRef.current.contains(e.target as Node)
    const isOutsideButton = sortButtonRef.current && !sortButtonRef.current.contains(e.target as Node)

    if (isOutsideMenu && isOutsideButton) {
      setVisibleSort(false)
    }
  }

  if (visibleSort) {
    document.addEventListener('pointerdown', handleClickOutsideSort)
  } else {
    document.removeEventListener('pointerdown', handleClickOutsideSort)
  }

  return () => document.removeEventListener('pointerdown', handleClickOutsideSort)
  }, [visibleSort])

  useEffect(() => {
    const handleClickOutsideFilters = (e: PointerEvent) => {
      if (menuFiltersRef.current && !menuFiltersRef.current.contains(e.target as Node)) {
        setVisibleFilters(false)
        setIsFiltersProductOpen(false)
      }
    }

    if (visibleFilters) {
      document.addEventListener('pointerdown', handleClickOutsideFilters)
    } else {
      document.removeEventListener('pointerdown', handleClickOutsideFilters)
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutsideFilters)
    }
  }, [visibleFilters])

  useEffect(() => {
    if (visibleFilters) {
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const filtersMenu = document.querySelector('[data-js-filter-menu]') as HTMLElement
          if (!filtersMenu) return

          const focusableElements = filtersMenu.querySelectorAll(
            'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
          )

          if (focusableElements.length === 0) return

          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (!filtersMenu.contains(document.activeElement)) {
            e.preventDefault()
            if (e.shiftKey) {
              lastElement.focus()
            } else {
              firstElement.focus()
            }
          }
          else if (document.activeElement === lastElement && !e.shiftKey) {
            e.preventDefault()
            firstElement.focus()
          }
          else if (document.activeElement === firstElement && e.shiftKey) {
            e.preventDefault()
            lastElement.focus()
          }
        }

        if (e.key === 'Escape') {
          handleToggleFilters()
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [visibleFilters])

  return (
    <>
      <section className={filtersBlock}>
        <div className={filtersBlockSort}>Сортировка:
          <button 
            ref={sortButtonRef}
            className={filtersBlockSortTitle} 
            onClick={() => setVisibleSort(!visibleSort)}
            tabIndex={0}
          >
            <span className={sortTitle}>{currentSort}</span>
            <span className={cx(sortTriangle, visibleSort ? sortTriangleUp : '')}>▼</span>
          </button>
        </div>
        <div className={filtersBlockFilter}>
          <Button
            className='button-violet'
            onClick={handleToggleFilters}
          >
            Фильтры
          </Button>
          <Button
            className='button-violet'
            onClick={handleResetFilters}
          >
            Сбросить фильтры
          </Button>
        </div>
        {visibleSort && 
          <SortMenu 
            ref={menuSortRef} 
            onSelect={handleSortSelect} 
            onClose={handleCloseSortMenu}
          />
        }
        {visibleFilters && 
          <FiltersMenu handleToggleFilters={handleToggleFilters} ref={menuFiltersRef} />
        }
      </section>
    </>
  )
}

export default FiltersBlock