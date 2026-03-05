import { CATEGORIES } from '@/features/layout/products/constants/categories'
import { useForm } from 'react-hook-form'
import styles from './ProductsFilter.module.scss'

interface IFilterFormData {
  search: string
  categoryId: number
  minPrice: string
  maxPrice: string
}

interface IProductsFilterProps {
  onApply: (filters: { 
    search: string, 
    categoryId: number, 
    minPrice: number | undefined, 
    maxPrice: number | undefined
  }) => void
  initialSearch?: string
  initialCategory?: number
  initialMinPrice?: string
  initialMaxPrice?: string
}

export const ProductsFilter = ({
  onApply,
  initialSearch = '',
  initialCategory = 0,
  initialMinPrice = '',
  initialMaxPrice = ''
}: IProductsFilterProps) => {
  const {
    'filters-form': filtersForm,
    'filters-form__search': filtersGroupSearch,
    'filters-form__buttons': filtersButtons
  } = styles

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      search: initialSearch,
      categoryId: initialCategory,
      minPrice: initialMinPrice,
      maxPrice: initialMaxPrice
    }
  })

  const onSubmit = (data: IFilterFormData) => {
    onApply({
      search: data.search,
      categoryId: data.categoryId,
      minPrice: data.minPrice ? parseFloat(data.minPrice) : undefined,
      maxPrice: data.maxPrice ? parseFloat(data.maxPrice) : undefined
    })
  }

  const handleClear = () => {
    reset({
      search: '',
      categoryId: 0,
      minPrice: '',
      maxPrice: ''
    })
    onApply({
      search: '',
      categoryId: 0,
      minPrice: undefined,
      maxPrice: undefined
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={filtersForm} noValidate>
      <input
        className={filtersGroupSearch}
        type='text'
        placeholder='Поиск по названию'
        {...register('search')}
      />
      <select {...register('categoryId', { valueAsNumber: true })}>
        {CATEGORIES.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.label}</option>
        ))}
      </select>
      <input
        type='number'
        placeholder='Мин. цена'
        {...register('minPrice')}
        min='0'
        step='0.01'
      />
      <input
        type='number'
        placeholder='Макс. цена'
        {...register('maxPrice')}
        min='0'
        step='0.01'
      />
      <div className={filtersButtons}>
        <button type='submit' className='button-violet'>Применить</button>
        <button type='submit' className='button-grey margin-null' onClick={handleClear}>
          Очистить
        </button>
      </div>
    </form>
  )
}