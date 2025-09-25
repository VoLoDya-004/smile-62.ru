import { useEffect, useRef, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Context } from '../../../contexts/context'
import type { RootStore } from '../../../redux'
import Button from '../../Button/Button'
import SortMenu from '../SortMenu/SortMenu'
import FiltersMenu from '../FiltersMenu/FiltersMenu'


const FiltersBlock = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const {setSortType, setCurrentPage, handleFiltersChange, 
    currentSort, setCurrentSort, activeCategoryId, categories,
    fetchCards, setSelectedCategory, setActiveCategoryId,
    totalItems} = context

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const [visibleSort, setVisibleSort] = useState(false)
    const [visibleFilters, setVisibleFilters] = useState(false)
    const [categoriesName, setCategoriesName] = useState('Все категории')
    const [visible, setVisible] = useState(false)

    const menuSortRef = useRef<HTMLFormElement | null>(null)
    const menuFiltersRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        categories.filter(cat => {
            if (cat.id === activeCategoryId) {
                setCategoriesName(cat.label)
            }
        })
        if (activeCategoryId === 0) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [activeCategoryId])

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
        setCurrentSort(sortOption === 'default' ? 'По умолчанию' :
            sortOption === 'cheap' ? 'Дешевле' : 
            sortOption === 'expensive' ? 'Дороже' : 
            'По скидке (%)'
        )
        setTimeout(() => {
            setVisibleSort(false)
        }, 500)     
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
        const handleClickOutsideSort = (e: MouseEvent) => {
            if (menuSortRef.current && !menuSortRef.current.contains(e.target as Node)) {
                setVisibleSort(false)
            }
        }

        if (visibleSort) {
            document.addEventListener('mousedown', handleClickOutsideSort)
        } else {
            document.removeEventListener('mousedown', handleClickOutsideSort)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSort)
        }
    }, [visibleSort])

    useEffect(() => {
        const handleClickOutsideFilters = (e: MouseEvent) => {
            if (menuFiltersRef.current && !menuFiltersRef.current.contains(e.target as Node)) {
                setVisibleFilters(false)
                document.getElementById('blackout')?.classList.remove('blackout')
                document.body.classList.remove('modal-open')
            }
        }

        if (visibleFilters) {
            document.addEventListener('mousedown', handleClickOutsideFilters)
        } else {
            document.removeEventListener('mousedown', handleClickOutsideFilters)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideFilters)
        }
    }, [visibleFilters])

    const allCategoriesBtn = () => {
        if (activeCategoryId !== 0) {
            setVisible(false)
            setActiveCategoryId(0)
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


    return (
        <>
            <div 
                onClick={allCategoriesBtn}
                className={`
                    categories-name-main 
                    ${isDarkTheme ? 'dark-theme' : ''} 
                    ${activeCategoryId === 0 ? 'passive' : '' }
                `}
            >
                Все категории{activeCategoryId === 0 ? ' /' : '' } 
            </div>
            {visible && 
                <div className='categories-name'>
                    <div className='categories-name-slash'>/</div>
                    {categoriesName} /
                </div>
            }
            <div className='count-products'> {totalItems} {itemText} </div>
            <section className={`filters-block ${isDarkTheme ? 'dark-theme' : ''}`}>
                <div className='filters-block__sort'>Сортировка:
                    <div 
                        className={`filters-block__sort-title ${isDarkTheme ? 'dark-theme' : ''}`} 
                        onClick={handleToggleSort}
                    >
                        <span>{currentSort}</span>
                        {visibleSort ? 
                            <span className='sort-product'>▴</span> : 
                            <span className='sort-product'>▾</span>
                        }
                    </div>
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
                <SortMenu ref={menuSortRef} onSelect={handleSortSelect} />
            }
            {visibleFilters && 
                <FiltersMenu handleToggleFilters={handleToggleFilters} ref={menuFiltersRef} />
            }
            </section>
        </>
    )
}

export default FiltersBlock