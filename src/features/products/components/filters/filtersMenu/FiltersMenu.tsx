import { forwardRef, useEffect } from 'react'
import Accordion from './Accordion'
import Button from '@/shared/ui/buttons/Button'
import ButtonCross from '@/shared/ui/buttons/ButtonCross'
import styles from './FiltersMenu.module.scss'
import { useForm } from 'react-hook-form'
import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit'
import { cx } from '@/shared/utils/classnames'
import { useProducts } from '../../../hooks/useProducts'
import type { IFiltersFormValues } from '../../../types/mainTypes'
import { useProductsContext } from '@/features/products/providers/ProductsProvider'

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
  const { isLoading } = useProducts()

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      minPrice: '',
      maxPrice: '',
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

  useEffect(() => {
    if (filters) {
      reset({
        minPrice: filters.minPrice !== null ? String(filters.minPrice) : '',
        maxPrice: filters.maxPrice !== null ? String(filters.maxPrice) : '',
        action1: filters.actions.action1,
        action2: filters.actions.action2,
        action3: filters.actions.action3,
        action4: filters.actions.action4,
        action5: filters.actions.action5,
        action6: filters.actions.action6,
        action7: filters.actions.action7,
        action8: filters.actions.action8,
      })
    }
  }, [filters, reset])

  const minPriceValue = watch('minPrice')
  const maxPriceValue = watch('maxPrice')
  const isPriceRangeDisabled = minPriceValue !== '' || maxPriceValue !== ''

  useEffect(() => {
    if (isPriceRangeDisabled) {
      setValue('action5', false)
      setValue('action6', false)
      setValue('action7', false)
      setValue('action8', false)
    }
  }, [isPriceRangeDisabled, setValue])

  const onSubmit = (data: IFiltersFormValues) => {
    handleFiltersChange({
      minPrice: data.minPrice !== '' ? parseFloat(data.minPrice) : null,
      maxPrice: data.maxPrice !== '' ? parseFloat(data.maxPrice) : null,
      actions: {
        action1: data.action1,
        action2: data.action2,
        action3: data.action3,
        action4: data.action4,
        action5: data.action5,
        action6: data.action6,
        action7: data.action7,
        action8: data.action8,
      }
    })
    handleToggleFilters()
  }

  const onReset = () => {
    const emptyFilters = {
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
    }
    handleFiltersChange(emptyFilters)
    reset()
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion title='Акции'>
          <label aria-label='Без акции'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                {...register('action1')}
              />
              Без акции
            </div>
          </label>
          <label aria-label='Акция меньше 10%'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                {...register('action2')}
              />
              Акция меньше 10%
            </div>
          </label>
          <label aria-label='Акция 10-20%'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                {...register('action3')}
              />
              Акция 10-20%
            </div>
          </label>
          <label aria-label='Акция больше 20%'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                {...register('action4')}
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
                placeholder='от...'
                aria-label='Начальная граница стоимости товаров'
                {...register('minPrice')}
              />
            </div>
            <div className={accordionInputBlock}>
              <input 
                id='accordion__input-right'
                className={accordionInput}
                type='number'
                min='1'
                max='1000000' 
                placeholder='до...'
                aria-label='Конечная граница стоимости товаров'
                {...register('maxPrice')}
              />
            </div>
          </div>
          <label aria-label='Меньше 100 рублей'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                disabled={isPriceRangeDisabled}
                {...register('action5')}
              />
              <span className={accordionItemMargin}>
                Меньше 100 ₽
              </span>
            </div>
          </label>
          <label aria-label='От 100 до 500 рублей'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox' 
                disabled={isPriceRangeDisabled}
                {...register('action6')}
              />
              <span className={accordionItemMargin}>
                От 100 ₽ до 500 ₽
              </span>
            </div>
          </label>
          <label aria-label='От 500 до 1500 рублей'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                disabled={isPriceRangeDisabled}
                {...register('action7')}
              />
              <span className={accordionItemMargin}>
                От 500 ₽ до 1500 ₽
              </span>
            </div>
          </label>
          <label aria-label='Больше 1500 рублей'>
            <div className={accordionItem}>
              <input 
                className='margin-checkbox cursor-pointer'
                type='checkbox'
                disabled={isPriceRangeDisabled}
                {...register('action8')}
              />
              <span className={accordionItemMargin}>
                Больше 1500 ₽
              </span>
            </div>
          </label>
        </Accordion>
        <div className={accordionButton}>
          <ButtonSubmit 
            className={cx(isLoading ? 'button-violet button-violet_disabled' : 'button-violet')}
            disabled={isLoading}
          >
            Применить
          </ButtonSubmit>
          <Button className='button-grey' onClick={onReset}>
            Сбросить
          </Button>
        </div>
      </form>
    </section>
  )
})

export default FiltersMenu
