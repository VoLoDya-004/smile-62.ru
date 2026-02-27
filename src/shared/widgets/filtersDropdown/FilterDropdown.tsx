import { useState, useRef, useEffect } from 'react'
import styles from './FilterDropdown.module.scss'

interface IOption {
  value: string
  label: string
}

interface IFilterDropdownProps {
  label: string
  options: IOption[]
  selectedValues: string[]
  onChange: (value: string, checked: boolean) => void
  position: 'left' | 'right' | 'top' | 'bottom'
}

const FilterDropdown = ({
  label,
  options,
  selectedValues,
  onChange,
  position
}: IFilterDropdownProps) => {
  const {
    'dropdown': dropdown,
    'button': button,
    'arrow': arrow,
    'arrow_up': arrowUp,
    'menu': menu,
    'menu__item': menuItem
  } = styles

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  const selectedCount = selectedValues.length

  return (
    <div className={dropdown} ref={containerRef}>
      <button
        type='button'
        className={button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}{selectedCount > 0 && ` (${selectedCount})`}</span>
        <span className={`${arrow} ${isOpen ? arrowUp : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div 
          className={menu}
          style={{ [position]: '0px' }}
        >
          {options.map(option => (
            <label key={option.value} className={menuItem}>
              <input
                type='checkbox'
                checked={selectedValues.includes(option.value)}
                onChange={(e) => {onChange(option.value, e.target.checked)}}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown