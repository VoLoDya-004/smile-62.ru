import type { ChangeEvent, KeyboardEvent } from 'react'
import Search from '../search/Search'
import styles from './AdminSearchSelect.module.scss'

interface IOption {
  value: string
  label: string
}

interface IAdminSearchSelectProps {
  searchValue: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onSearchClick: () => void
  onSearchClear: () => void
  searchPlaceholder?: string
  selectValue: string
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectOptions: IOption[]
}

const AdminSearchSelect = ({
  searchValue,
  onSearchChange,
  onSearchKeyDown,
  onSearchClick,
  onSearchClear,
  searchPlaceholder = 'Поиск...',
  selectValue,
  onSelectChange,
  selectOptions
}: IAdminSearchSelectProps) => {
  const {
    'users-params': usersParams,
    'search-wrapper': searchWrapper,
    'users-params__filters': usersFilters
  } = styles

  return (
    <div className={usersParams}>
      <div className={searchWrapper}>
        <Search
          value={searchValue}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          onSearchClick={onSearchClick}
          onClear={onSearchClear}
          placeholder={searchPlaceholder}
          className='padding-null'
        />
      </div>
      <select
        id='users-select'
        className={usersFilters}
        value={selectValue}
        onChange={onSelectChange}
      >
        {selectOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>  
  )
}

export default AdminSearchSelect