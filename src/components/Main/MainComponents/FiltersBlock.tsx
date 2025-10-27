import { useEffect, useRef, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Context } from '../../../contexts/context'
import type { RootStore } from '../../../redux'
import Button from '../../Button/Button'
import SortMenu from './SortMenu'
import FiltersMenu from './FiltersMenu/FiltersMenu'


const FiltersBlock = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const {
        setSortType, 
        setCurrentPage, 
        handleFiltersChange, 
        currentSort, 
        setCurrentSort, 
        selectedCategory, 
        categories,
        fetchCards, 
        setSelectedCategory, 
        totalItems, 
        setSearchParams
    } = context

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const [visibleSort, setVisibleSort] = useState(false)
    const [visibleFilters, setVisibleFilters] = useState(false)
    const [categoriesName, setCategoriesName] = useState('Все категории')
    const [visible, setVisible] = useState(false)

    const menuSortRef = useRef<HTMLFormElement | null>(null)
    const menuFiltersRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        categories.filter(cat => {
            if (cat.id === selectedCategory) {
                setCategoriesName(cat.label)
            }
        })
        if (selectedCategory === 0) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [selectedCategory])

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

    useEffect(() => {
        const savedSort = sessionStorage.getItem('selectedSortOption')
        if (savedSort) {
            setSortType(savedSort)
            setCurrentSort(
                savedSort === 'default' ? 'По умолчанию' :
                savedSort === 'cheap' ? 'Дешевле' : 
                savedSort === 'expensive' ? 'Дороже' : 
                'По скидке (%)'
            )
        }
    }, [])

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
        return () => {
            document.removeEventListener('pointerdown', handleClickOutsideSort)
        }
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

    function pluralize(number: number, words: string[]) {
        const cases = [2, 0, 1, 1, 1, 2]
        return words[
            (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
        ]
    }

    const itemText = pluralize(totalItems, ['товар', 'товара', 'товаров'])


    useEffect(() => {
        if (visibleFilters) {
            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === 'Tab') {
                    const filtersMenu = 
                        document.querySelector('[data-js-filter-menu]') as HTMLElement
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
            <nav aria-label='Навигация по категориям'>
                <button 
                    onClick={allCategoriesBtn}
                    className={`
                        categories-name-main 
                        ${isDarkTheme ? 'dark-theme' : ''} 
                        ${selectedCategory === 0 ? 'passive' : '' }
                        button-reset
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