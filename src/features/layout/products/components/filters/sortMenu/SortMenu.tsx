import { forwardRef, useEffect, useRef, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductsContext } from '@/features/layout/products/providers/ProductsProvider'
import styles from './SortMenu.module.scss'
import { useForm } from 'react-hook-form'

type TSortMenuProps = { onSelect: (sortOption: string) => void }

const SortMenu = forwardRef<HTMLFormElement, TSortMenuProps>(({ onSelect }, ref) => {
  const {
    'sort-menu': sortMenu,
    'sort-option': sortOption
  } = styles

  const { setSearchParams } = useProductsContext()
  const [searchParams] = useSearchParams()

  const { register, watch, setValue } = useForm({
    defaultValues: {
      sortOption: searchParams.get('sortProducts') || 'default'
    }
  })

  const currentSort = watch('sortOption')

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (currentSort === 'default') {
      newSearchParams.delete('sortProducts')
    } else {
      newSearchParams.set('sortProducts', currentSort)
    }
    setSearchParams(newSearchParams)
    onSelect(currentSort)
    //onClose()
  }, [currentSort, searchParams, setSearchParams])

  useEffect(() => {
    const sortFromUrl = searchParams.get('sortProducts') || 'default'
    setValue('sortOption', sortFromUrl)
  }, [searchParams, setValue])

  const handleKeyDown = (e: KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setValue('sortOption', value)
    }
  }

  const firstRadioRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    firstRadioRef.current?.focus()
  }, [])
    
  return (
    <form className={sortMenu} ref={ref} noValidate>
      <label 
        htmlFor='sort-menu-default' 
        className={sortOption} 
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'default')}
        ref={firstRadioRef}
      >
        <input 
          className='cursor-pointer'
          type='radio'
          id='sort-menu-default'
          value='default'
          {...register('sortOption')}
          tabIndex={-1}
        />
        По умолчанию
      </label>
      <label 
        htmlFor='sort-menu-cheap' 
        className={sortOption} 
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'cheap')}
      >
        <input 
          className='cursor-pointer'
          type='radio'
          id='sort-menu-cheap' 
          value='cheap'
          {...register('sortOption')}
          tabIndex={-1}
        />
        Дешевле
      </label>
      <label 
        htmlFor='sort-menu-expensive'
        className={sortOption} 
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'expensive')}
      >
        <input 
          className='cursor-pointer'
          type='radio'
          id='sort-menu-expensive'
          value='expensive'
          {...register('sortOption')}
          tabIndex={-1}
        />
        Дороже
      </label>
      <label 
        htmlFor='sort-menu-discount'
        className={sortOption} 
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'discount')}
      >
        <input 
          className='cursor-pointer'
          type='radio'
          id='sort-menu-discount'
          value='discount'
          {...register('sortOption')}
          tabIndex={-1}
        />
        По скидке (%)
      </label>
    </form>
  )
})

export default SortMenu











