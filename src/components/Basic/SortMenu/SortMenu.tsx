import {useSelector} from 'react-redux'
import { forwardRef } from 'react'
import type { RootStore } from '../../../redux'


interface ISortMenuProps {
    onSelect: (sortOption: string) => void
}


const SortMenu = forwardRef<HTMLFormElement, ISortMenuProps>(({onSelect}, ref) => {

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const handleRadioChange = (value: string) => {
        if (onSelect) {
            onSelect(value)
        }
    }


    return (
        <form 
            className={`sort-menu ${isDarkTheme ? 'dark-theme' : ''}`} 
            ref={ref}
        >
            <label 
                htmlFor='sort-menu1' 
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`} 
            >
                <input 
                    name='sortOptions'
                    type='radio'
                    id='sort-menu1'
                    onChange={() => handleRadioChange('default')} 
                />
                По умолчанию
            </label>
            <label 
                htmlFor='sort-menu2' 
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
            >
                <input 
                    type='radio'
                    id='sort-menu2' 
                    name='sortOptions'
                    onChange={() => handleRadioChange('cheap')}
                />
                Дешевле
            </label>
            <label 
                htmlFor='sort-menu3'
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
            >
                <input 
                    name='sortOptions' 
                    type='radio'
                    id='sort-menu3'
                    onChange={() => handleRadioChange('expensive')} 
                />
                Дороже
            </label>
            <label 
                htmlFor='sort-menu4'
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
            >
                <input 
                    type='radio'
                    id='sort-menu4'
                    name='sortOptions'
                    onChange={() => handleRadioChange('discount')} 
                />
                По скидке (%)
            </label>
        </form>
    )
})

export default SortMenu