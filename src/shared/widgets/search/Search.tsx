import { useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import styles from './Search.module.scss'
import { cx } from '@/shared/utils/classnames'

interface ISearchProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onSearchClick: () => void
  onClear: () => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  className?: string 
}

const Search = ({
  value,
  onChange,
  onKeyDown,
  onSearchClick,
  onClear,
  onFocus,
  onBlur,
  placeholder = 'Искать здесь...',
  className
}: ISearchProps) => {
  const { 
    search, 
    'search__line': searchLine,
    'search__line-clear': searchLineClear,
    'search__line-button': searchLineButton,
    'search__line-button-img': searchLineButtonImg,
    'search__line-input': searchLineInput
  } = styles

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    onSearchClick()
    if (!value && inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={cx(search, className)}>
      <div className={searchLine}>
        <input
          ref={inputRef}
          type='search'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          className={searchLineInput}
          aria-label='Строка поиска'
          spellCheck='false'
        />
        {value && (
          <button
            type='button'
            className={searchLineClear}
            onClick={onClear}
            aria-label='Очистить поле поиска'
          >
            <span>✕</span>
          </button>
        )}
        <button 
          type='button'
          className={searchLineButton}
          onClick={handleSearchClick}
          aria-label='Поиск'
        >
          <img
            className={searchLineButtonImg}
            src='/images/icons/search.png'
            alt='Поиск'
          />
        </button>
      </div>
    </div>
  )
}

export default Search