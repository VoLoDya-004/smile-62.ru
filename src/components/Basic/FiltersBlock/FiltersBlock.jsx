import { useEffect, useRef, useState, useContext } from "react"
import { useSelector } from "react-redux"
import Button from "../../Button/Button"
import SortMenu from "../SortMenu/SortMenu"
import FiltersMenu from "../FiltersMenu/FiltersMenu"
import { Context } from "../../../JS/context"


export default function FiltersBlock() {
    const context = useContext(Context)
    const {setSortType, setCurrentPage, handleFiltersChange, 
    currentSort, setCurrentSort, activeCategoryId, categories,
    fetchCards, setSelectedCategory, setActiveCategoryId,
    totalItems} = context

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)

    const [visibleSort, setVisibleSort] = useState(false)
    const [visibleFilters, setVisibleFilters] = useState(false)
    const [categoriesName, setCategoriesName] = useState("Все категории")
    const [visible, setVisible] = useState(false)

    const menuSortRef = useRef(null)
    const menuFiltersRef = useRef(null)

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
            document.getElementById("blackout").classList.remove("blackout")
            document.body.classList.remove('modal-open')
        } else {
            document.getElementById("blackout").classList.add("blackout")
            document.body.classList.add('modal-open')
        }
    }

    const handleSortSelect = (sortOption) => {
        setCurrentPage(1)
        setSortType(sortOption)
        setCurrentSort(sortOption === "default" ? "По умолчанию" :
            sortOption === "cheap" ? "Дешевле" : 
            sortOption === "expensive" ? "Дороже" : 
            "По скидке (%)"
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
        const handleClickOutsideSort = (e) => {
            if (menuSortRef.current && !menuSortRef.current.contains(e.target)) {
                setVisibleSort(false)
            }
        }

        if (visibleSort) {
            document.addEventListener("mousedown", handleClickOutsideSort)
        } else {
            document.removeEventListener("mousedown", handleClickOutsideSort)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSort)
        }
    }, [visibleSort])

    useEffect(() => {
        const handleClickOutsideFilters = (e) => {
            if (menuFiltersRef.current && !menuFiltersRef.current.contains(e.target)) {
                setVisibleFilters(false)
                document.getElementById("blackout").classList.remove("blackout")
                document.body.classList.remove('modal-open')
            }
        }

        if (visibleFilters) {
            document.addEventListener("mousedown", handleClickOutsideFilters)
        } else {
            document.removeEventListener("mousedown", handleClickOutsideFilters)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideFilters)
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

    function pluralize(number, words) {
        const cases = [2, 0, 1, 1, 1, 2]
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
    }

    const itemText = pluralize(totalItems, ['товар', 'товара', 'товаров'])


    return (
        <>
            <div 
                onClick={allCategoriesBtn}
                className={`categoriesNameMain ${isDarkTheme ? "dark-theme" : ""} ${activeCategoryId === 0 ? 'passive' : '' }`}
            >
                Все категории{activeCategoryId === 0 ? ' /' : '' }
            </div>
            {visible && 
                <div className="categoriesName" id="categoriesName" style={{marginLeft: "0", color: "grey"}}>
                    <div 
                        style={{display: "inline-block", margin: "0 8px", userSelect: "none"}}
                    >
                        /
                    </div>
                    {categoriesName} /
                </div>
            }
            <div className="countProducts"> {totalItems} {itemText} </div>
            <section className={`filtersBlock ${isDarkTheme ? 'dark-theme' : ''}`}>
                <div className="filtersBlock__sort">Сортировка:
                    <div 
                        className={`filtersBlock__sort_title ${isDarkTheme ? 'dark-theme' : ''}`} 
                        onClick={handleToggleSort}
                    >
                        <span>{currentSort}</span>
                        {visibleSort ? <span className="sortProduct">▴</span> : 
                            <span className="sortProduct">▾</span>}
                    </div>
                </div>
                <div className="filtersBlock__filter">
                    <Button
                        className="form__registration_btn"
                        id="filtersProduct"
                        onClick={handleToggleFilters}
                    >
                        Фильтры
                    </Button>
                    <Button
                        className="form__registration_btn"
                        id="filtersDeleteProduct"
                        onClick={handleResetFilters}
                    >
                        Сбросить фильтры
                    </Button>
                </div>
            {visibleSort && <SortMenu ref={menuSortRef} onSelect={handleSortSelect} />}
            {visibleFilters && <FiltersMenu handleToggleFilters={handleToggleFilters} ref={menuFiltersRef} />}
            </section>
        </>
    )
}