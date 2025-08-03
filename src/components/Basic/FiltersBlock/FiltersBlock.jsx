import { useEffect, useRef, useState, useContext } from "react"
import Button from "../../Button/Button"
import SortMenu from "../SortMenu/SortMenu"
import FiltersMenu from "../FiltersMenu/FiltersMenu"
import { Context } from "../../../JS/context"


export default function FiltersBlock() {
    const context = useContext(Context)
    const {setSortType, setCurrentPage} = context
    const [visibleSort, setVisibleSort] = useState(false)
    const [visibleFilters, setVisibleFilters] = useState(false)
    const [currentSort, setCurrentSort] = useState("по умолчанию")
    const menuSortRef = useRef(null)
    const menuFiltersRef = useRef(null)

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


    return (
        <section className="filtersBlock">
            <div className="filtersBlock__sort">Сортировка:
                <div className="filtersBlock__sort_title" onClick={handleToggleSort}>
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
                    onClick=""
                >
                    Сбросить фильтры
                </Button>
            </div>
        {visibleSort && <SortMenu ref={menuSortRef} onSelect={handleSortSelect} />}
        {visibleFilters && <FiltersMenu handleToggleFilters={handleToggleFilters} ref={menuFiltersRef} />}
        </section>
    )
}