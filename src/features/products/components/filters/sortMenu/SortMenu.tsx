import { forwardRef, useEffect, useRef, type KeyboardEvent, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import styles from './SortMenu.module.scss'

type TSortMenuProps = { onSelect: (sortOption: string) => void }

const SortMenu = forwardRef<HTMLFormElement, TSortMenuProps>(({ onSelect }, ref) => {
  const {
    'sort-menu': sortMenu,
    'sort-option': sortOption
  } = styles

  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [selectedSort, setSelectedSort] = useState(() => {
    return searchParams?.get('sortProducts') || 'default'
  })

  useEffect(() => {
    const sortFromUrl = searchParams?.get('sortProducts') || 'default'
    if (sortFromUrl !== selectedSort) {
      setSelectedSort(sortFromUrl)
    }
  }, [searchParams, selectedSort])

  const handleSortChange = (value: string) => {
    if (value === selectedSort) return 
    
    setSelectedSort(value)
    
    const newParams = new URLSearchParams(searchParams?.toString() || '')
    
    if (value === 'default') {
      newParams.delete('sortProducts')
    } else {
      newParams.set('sortProducts', value)
    }
    
    const newUrl = newParams.toString() ? `?${newParams.toString()}` : '/'
    router.push(newUrl, { scroll: false })
    onSelect(value)
  }

  const handleKeyDown = (e: KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSortChange(value)
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
          checked={selectedSort === 'default'}
          onChange={() => handleSortChange('default')}
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
          checked={selectedSort === 'cheap'}
          onChange={() => handleSortChange('cheap')}
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
          checked={selectedSort === 'expensive'}
          onChange={() => handleSortChange('expensive')}
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
          checked={selectedSort === 'discount'}
          onChange={() => handleSortChange('discount')}
          tabIndex={-1}
        />
        По скидке (%)
      </label>
    </form>
  )
})

export default SortMenu