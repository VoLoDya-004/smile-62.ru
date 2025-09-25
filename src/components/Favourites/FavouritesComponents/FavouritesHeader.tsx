import { useSelector } from 'react-redux'
import { memo } from 'react'
import type { RootStore } from '../../../redux'


const FavouritesHeader = () => {
    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)


    return (
        <div className={`favourites-box__table-header ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className='favourites-box__table-header-title'>Наименование</div>
            <div className='cursor-default'>Стоимость</div>                                              
        </div>   
    )
}

export default memo(FavouritesHeader)