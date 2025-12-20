import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProductsContext } from '../../../contexts/ProductsContext'
import type { RootStore } from '@/shared/store'
import Button from '@/shared/ui/buttons/Button'
import SortMenu from './sortMenuComponents/SortMenu'
import FiltersMenu from './filtersMenuComponents/FiltersMenu'

const FiltersBlock = () => {
  const {
    setSortType, 
    setCurrentPage, 
    handleFiltersChange, 
    currentSort, 
    setCurrentSort, 
  } = useProductsContext()

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const [visibleSort, setVisibleSort] = useState(false)
  const [visibleFilters, setVisibleFilters] = useState(false)

  const menuSortRef = useRef<HTMLFormElement | null>(null)
  const menuFiltersRef = useRef<HTMLElement | null>(null)

  const handleToggleSort = () => {
    setVisibleSort(prev => !prev)
  }

  const handleToggleFilters = () => {
    setVisibleFilters(prev => !prev)

    if (visibleFilters) {
      document.getElementById('blackout')?.classList.remove('blackout')
      document.body.classList.remove('modal-open')
    } else {
      document.getElementById('blackout')?.classList.add('blackout')
      document.body.classList.add('modal-open')
    }
  }

  const handleSortSelect = (sortOption: string) => {
    setCurrentPage(1)
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
    setCurrentPage(1)
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
    if (menuSortRef.current && !menuSortRef.current.contains(e.target as Node)) {
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
        document.getElementById('blackout')?.classList.remove('blackout')
        document.body.classList.remove('modal-open')
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
      <section className={`filters-block ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className='filters-block__sort'>Сортировка:
          <button 
            className={`filters-block__sort-title ${isDarkTheme ? 'dark-theme' : ''}`} 
            onClick={handleToggleSort}
            tabIndex={0}
          >
            <span>{currentSort}</span>
            {visibleSort ? 
              <span className='sort-product'>▴</span> : 
              <span className='sort-product'>▾</span>
            }
          </button>
        </div>
        <div className='filters-block__filter'>
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