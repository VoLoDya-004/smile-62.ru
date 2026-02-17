import { forwardRef, useEffect, useState, type ChangeEvent } from 'react'
import { useProductsContext } from '@/features/layout/products/providers/ProductsProvider'
import Accordion from './Accordion'
import Button from '@/shared/ui/buttons/Button'
import ButtonCross from '@/shared/ui/buttons/ButtonCross'
import styles from './FiltersMenu.module.scss'

interface IFiltersMenuProps {
  handleToggleFilters: () => void
}

const FiltersMenu = forwardRef<HTMLElement, IFiltersMenuProps>(({ handleToggleFilters }, ref) => {
  const { 
    'filter-menu': filterMenu,
    'filter-menu__title': filterMenuTitle,
    'accordion__item': accordionItem,
    'accordion__item-margin': accordionItemMargin,
    'accordion__price': accordionPrice,
    'accordion__input': accordionInput,
    'accordion__input-block': accordionInputBlock,
    'accordion__btn': accordionButton,
  } = styles

  const { handleFiltersChange, filters } = useProductsContext()

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
        action1: filters.actions.action1 ? true : false,
        action2: filters.actions.action2 ? true : false,
        action3: filters.actions.action3 ? true : false,
        action4: filters.actions.action4 ? true : false,
        action5: filters.actions.action5 ? true : false,
        action6: filters.actions.action6 ? true : false,
        action7: filters.actions.action7 ? true : false,
        action8: filters.actions.action8 ? true : false,
      })
      setMinPrice(filters.minPrice !== null ? String(filters.minPrice) : '')
      setMaxPrice(filters.maxPrice !== null ? String(filters.maxPrice) : '')
    }
  }, [filters])

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value)

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
    setMaxPrice(value)

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
    handleFiltersChange({
      minPrice: minPrice !== '' ? parseFloat(minPrice) : null,
      maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : null,
      actions: { ...actions }
    })
    handleToggleFilters()
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
    handleToggleFilters()
  }

  return (
    <section 
      ref={ref} 
      className={filterMenu}
      data-js-filter-menu
      aria-label='Фильтры товаров'
    >
      <div className={filterMenuTitle}>
        <h3 className='margin-null'>Фильтры</h3>
        <ButtonCross className='button-cross' onClick={handleToggleFilters} />
      </div>
      <Accordion title='Акции'>
        <label aria-label='Без акции'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox'
              name='action1'
              checked={actions.action1}
              onChange={handleCheckboxChange}
            />
            Без акции
          </div>
        </label>
        <label aria-label='Акция меньше 10%'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox'
              name='action2'
              checked={actions.action2}
              onChange={handleCheckboxChange}
            />
            Акция меньше 10%
          </div>
        </label>
        <label aria-label='Акция 10-20%'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox'
              name='action3'
              checked={actions.action3}
              onChange={handleCheckboxChange}
            />
            Акция 10-20%
          </div>
        </label>
        <label aria-label='Акция больше 20%'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
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
        <div className={accordionPrice}>
          <div className={accordionInputBlock}>
            <input 
              id='accordion__input-left'
              className={accordionInput}
              type='number'
              min='1'
              max='1000000'
              value={minPrice}
              placeholder='от...'
              onChange={handleMinPriceChange}
              aria-label='Начальная граница стоимости товаров'
            />
          </div>
          <div className={accordionInputBlock}>
            <input 
              id='accordion__input-right'
              className={accordionInput}
              type='number'
              min='1'
              max='1000000' 
              value={maxPrice}
              placeholder='до...'
              onChange={handleMaxPriceChange}
              aria-label='Конечная граница стоимости товаров'
            />
          </div>
        </div>
        <label aria-label='Меньше 15 тысяч рублей'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox'
              name='action5'
              checked={actions.action5}
              onChange={handleCheckboxChange}
              disabled={minPrice !== '' || maxPrice !== ''}
            />
            <span className={accordionItemMargin}>
              Меньше 15&nbsp;000 &#8381;
            </span>
          </div>
        </label>
        <label aria-label='От 15 тысяч до 50 тысяч рублей'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox' 
              name='action6'
              checked={actions.action6}
              onChange={handleCheckboxChange}
              disabled={minPrice !== '' || maxPrice !== ''}
            />
            <span className={accordionItemMargin}>
              От 15&nbsp;000 &#8381; до 50&nbsp;000 &#8381;
            </span>
          </div>
        </label>
        <label aria-label='От 50 тысяч до 100 тысяч рублей'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox'
              name='action7'
              checked={actions.action7}
              onChange={handleCheckboxChange}
              disabled={minPrice !== '' || maxPrice !== ''}
            />
            <span className={accordionItemMargin}>
              От 50&nbsp;000 &#8381; до 100&nbsp;000 &#8381;
            </span>
          </div>
        </label>
        <label aria-label='Больше 100 тысяч рублей'>
          <div className={accordionItem}>
            <input 
              className='margin-checkbox cursor-pointer'
              type='checkbox'
              name='action8'
              checked={actions.action8}
              onChange={handleCheckboxChange}
              disabled={minPrice !== '' || maxPrice !== ''}
            />
            <span className={accordionItemMargin}>
              Больше 100&nbsp;000 &#8381;
            </span>
          </div>
        </label>
      </Accordion>
      <div className={accordionButton}>
        <Button className='button-violet' onClick={handleApplyFilters}>
          Применить
        </Button>
        <Button className='button-grey' onClick={handleResetFilters}>
          Сбросить
        </Button>
      </div>
    </section>
  )
})

export default FiltersMenu
