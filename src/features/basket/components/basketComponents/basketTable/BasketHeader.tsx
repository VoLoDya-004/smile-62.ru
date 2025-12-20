import { useSelector } from 'react-redux'
import type { RootStore } from '@/shared/store'

const BasketHeader = () => {
  const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

  return (
    <header className={`basket-box__table-header ${isDarkTheme ? 'dark-theme' : ''}`}>
      <h4 className='basket-box__table-header-title margin-null'>Наименование</h4>
      <h4 className='cursor-default margin-null'>Количество</h4>
      <h4 className='cursor-default margin-null'>Стоимость</h4>                                              
    </header>                 
  )
}

export default BasketHeader