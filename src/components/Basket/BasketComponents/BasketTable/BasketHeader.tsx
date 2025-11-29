import { useSelector } from 'react-redux'
import { memo } from 'react'
import type { RootStore } from '@/redux'


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

export default memo(BasketHeader)