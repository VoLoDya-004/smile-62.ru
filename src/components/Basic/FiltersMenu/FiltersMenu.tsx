import { forwardRef, useContext, useEffect, useState, type ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { Context } from '../../../contexts/context'
import type { RootStore } from '../../../redux'
import Accordion from './Accordion'
import Button from '../../Button/Button'
import ButtonCross from '../../Button/ButtonCross'

interface IFiltersMenuProps {
    handleToggleFilters: () => void
}


const FiltersMenu = forwardRef<HTMLElement, IFiltersMenuProps>(({handleToggleFilters}, ref) => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }
    const {handleFiltersChange, filters, setCurrentPage} = context

    const [actions, setActions] = useState({
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
        action7: false,
        action8: false,
    })

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    useEffect(() => {
        if (filters) {
            setActions({
                action1: filters.actions?.action1 ? true : false,
                action2: filters.actions?.action2 ? true : false,
                action3: filters.actions?.action3 ? true : false,
                action4: filters.actions?.action4 ? true : false,
                action5: filters.actions?.action5 ? true : false,
                action6: filters.actions?.action6 ? true : false,
                action7: filters.actions?.action7 ? true : false,
                action8: filters.actions?.action8 ? true : false,
            })
            setMinPrice(filters.minPrice !== null ? String(filters.minPrice) : '')
            setMaxPrice(filters.maxPrice !== null ? String(filters.maxPrice) : '')
        }
    }, [filters])

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMinPrice(e.target.value)

        if (value !== '' || maxPrice !== '') {
            setActions(prev => ({
                ...prev,
                action5: false,
                action6: false,
                action7: false,
                action8: false,
            }))
        }
    }

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMaxPrice(e.target.value)

        if (value !== '' || minPrice !== '') {
            setActions(prev => ({
                ...prev,
                action5: false,
                action6: false,
                action7: false,
                action8: false,
            }))
        }
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setActions({...actions, [e.target.name]: e.target.checked})
    }

    const handleApplyFilters = () => {
        setCurrentPage(1)
        const actionsForSend: typeof actions = {
            action1: actions.action1,
            action2: actions.action2,
            action3: actions.action3,
            action4: actions.action4,
            action5: actions.action5,
            action6: actions.action6,
            action7: actions.action7,
            action8: actions.action8,
        }
        for (const key of Object.keys(actions) as (keyof typeof actions)[]) {
            actionsForSend[key] = actions[key] ? true : false
        }
        handleFiltersChange({
            minPrice: minPrice !== '' ? parseFloat(minPrice) : null,
            maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : null,
            actions: actionsForSend
        })
        handleToggleFilters()
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
        handleToggleFilters()
    }

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

    useEffect(() => {
      const handleResize = () => {
        setViewportHeight(window.innerHeight)
        setViewportWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const portalTarget = document.getElementById('filter-menu')
    if (!portalTarget) {
        return null
    }


    return createPortal(
        <section 
            ref={ref} 
            className={`filter-menu ${isDarkTheme ? 'dark-theme' : ''}`}
            style={{ height: viewportWidth > 1000 ? `${viewportHeight - 72}px` : `${viewportHeight - 132}px`, overflowY: 'auto' }}
        >
            <div className={`filter-menu__title ${isDarkTheme ? 'dark-theme' : ''}`}>
                <b>Фильтры</b>
                <ButtonCross
                    className='button-cross'
                    onClick={handleToggleFilters}
                />
            </div>
            <Accordion title='Акции'>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action1'
                            checked={actions.action1}
                            onChange={handleCheckboxChange}
                        />
                        Без акции
                    </div>
                </label>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action2'
                            checked={actions.action2}
                            onChange={handleCheckboxChange}
                        />
                        Акция 1-10%
                    </div>
                </label>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action3'
                            checked={actions.action3}
                            onChange={handleCheckboxChange}
                        />
                        Акция 10-20%
                    </div>
                </label>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action4'
                            checked={actions.action4}
                            onChange={handleCheckboxChange}
                        />
                        Акция больше 20%
                    </div>
                </label>
            </Accordion>
            <Accordion title='Цена'>
                <div className={`accordion__price ${isDarkTheme ? 'dark-theme' : ''}`}>
                    <div 
                        className={`accordion__input-block ${isDarkTheme ? 'dark-theme' : ''}`}
                    >
                        <label 
                            htmlFor="accordion__input-left" 
                            className="visually-hidden"
                        >
                            Начальная граница стоимости товаров
                        </label>
                        <input 
                            id='accordion__input-left'
                            className=
                            {`accordion__input ${isDarkTheme ? 'dark-theme' : ''}`}
                            type='number'
                            min='1'
                            max='1000000'
                            value={minPrice}
                            placeholder='от...'
                            onChange={handleMinPriceChange}
                        />
                    </div>
                    <div 
                        className={`accordion__input-block ${isDarkTheme ? 'dark-theme' : ''}`}
                    >
                        <label 
                            htmlFor="accordion__input-left" 
                            className="visually-hidden"
                        >
                            Конечная граница стоимости товаров
                        </label>
                        <input 
                            id='accordion__input-right'
                            className=
                            {`accordion__input ${isDarkTheme ? 'dark-theme' : ''}`}
                            type='number'
                            min='1'
                            max='1000000' 
                            value={maxPrice}
                            placeholder='до...'
                            onChange={handleMaxPriceChange}
                        />
                    </div>
                </div>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action5'
                            checked={actions.action5}
                            onChange={handleCheckboxChange}
                            disabled={minPrice !== '' || maxPrice !== ''}
                        />
                        <span className='accordion__item-margin'>
                            Меньше 15&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox' 
                            name='action6'
                            checked={actions.action6}
                            onChange={handleCheckboxChange}
                            disabled={minPrice !== '' || maxPrice !== ''}
                        />
                        <span className='accordion__item-margin'>
                            От 15&nbsp;000 &#8381; до 50&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action7'
                            checked={actions.action7}
                            onChange={handleCheckboxChange}
                            disabled={minPrice !== '' || maxPrice !== ''}
                        />
                        <span className='accordion__item-margin'>
                            От 50&nbsp;000 &#8381; до 100&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
                <label>
                    <div className={`accordion__item ${isDarkTheme ? 'dark-theme' : ''}`}>
                        <input 
                            type='checkbox'
                            name='action8'
                            checked={actions.action8}
                            onChange={handleCheckboxChange}
                            disabled={minPrice !== '' || maxPrice !== ''}
                        />
                        <span className='accordion__item-margin'>
                            Больше 100&nbsp;000 &#8381;
                        </span>
                    </div>
                </label>
            </Accordion>
            <div 
                className='accordion__btn'   
            >
                <Button
                    className='button-violet'
                    onClick={handleApplyFilters}
                >
                    Применить
                </Button>
                <Button
                    className='button-grey'
                    onClick={handleResetFilters}
                >
                    Сбросить
                </Button>
            </div>
        </section>,
        portalTarget
    )
})

export default FiltersMenu
