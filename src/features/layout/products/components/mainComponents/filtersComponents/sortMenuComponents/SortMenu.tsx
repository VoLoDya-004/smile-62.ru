import { useSelector } from 'react-redux'
import { forwardRef, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { RootStore } from '@/shared/store'
import { useSearchParams } from 'react-router-dom'
import { useProductsContext } from '@/features/layout/products/contexts/ProductsContext'

interface ISortMenuProps {
  onSelect: (sortOption: string) => void
  onClose: () => void
}

const SortMenu = forwardRef<HTMLFormElement, ISortMenuProps>(({ onSelect, onClose }, ref) => {
  const { setSearchParams } = useProductsContext()

  const [searchParams] = useSearchParams()

  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  const [selectedOption, setSelectedOption] = useState(() => searchParams.get('sort') || 'default')

  useEffect(() => {
    const sortFromUrl = searchParams.get('sort') || 'default'
    setSelectedOption(sortFromUrl)
  }, [searchParams])

  const handleRadioChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
        
    if (value === 'default') {
      newSearchParams.delete('sort')
    } else {
      newSearchParams.set('sort', value)
    }
        
    setSearchParams(newSearchParams) 
    setSelectedOption(value)
    onSelect(value)
    onClose()
  }

  const handleKeyDown = (e: KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRadioChange(value)
    }
  }

  const firstRadioRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    firstRadioRef.current?.focus()
  }, [])
    
  return (
    <form 
      className={`sort-menu ${isDarkTheme ? 'dark-theme' : ''}`} 
      ref={ref}
    >
      <label 
        htmlFor='sort-menu-default' 
        className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`} 
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'default')}
        ref={firstRadioRef}
      >
        <input 
          className='cursor-pointer'
          checked={selectedOption === 'default'}
          name='sortOptions'
          type='radio'
          id='sort-menu-default'
          onChange={() => handleRadioChange('default')} 
          tabIndex={-1}
        />
        По умолчанию
      </label>
      <label 
        htmlFor='sort-menu-cheap' 
        className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'cheap')}
      >
        <input 
          className='cursor-pointer'
          checked={selectedOption === 'cheap'}
          type='radio'
          id='sort-menu-cheap' 
          name='sortOptions'
          onChange={() => handleRadioChange('cheap')}
          tabIndex={-1}
        />
        Дешевле
      </label>
      <label 
        htmlFor='sort-menu-expensive'
        className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'expensive')}
      >
        <input 
          className='cursor-pointer'
          checked={selectedOption === 'expensive'}
          name='sortOptions' 
          type='radio'
          id='sort-menu-expensive'
          onChange={() => handleRadioChange('expensive')} 
          tabIndex={-1}
        />
        Дороже
      </label>
      <label 
        htmlFor='sort-menu-discount'
        className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'discount')}
      >
        <input 
          className='cursor-pointer'
          checked={selectedOption === 'discount'}
          type='radio'
          id='sort-menu-discount'
          name='sortOptions'
          onChange={() => handleRadioChange('discount')} 
          tabIndex={-1}
        />
        По скидке (%)
      </label>
    </form>
  )
})

export default SortMenu











