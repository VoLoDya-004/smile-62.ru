import { useSelector } from 'react-redux'
import { memo } from 'react'
import type { RootStore } from '../../../../redux'


const FavouritesHeader = () => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <header 
            className={`favourites-box__table-header ${isDarkTheme ? 'dark-theme' : ''}`}
        >
            <h4 className='favourites-box__table-header-title margin-null'>Наименование</h4>
            <h4 className='cursor-default margin-null'>Стоимость</h4>                                              
        </header>   
    )
}

export default memo(FavouritesHeader)