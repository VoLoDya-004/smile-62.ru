import {useSelector} from 'react-redux'
import { forwardRef, useEffect, useState } from 'react'
import type { RootStore } from '../../../redux'


interface ISortMenuProps {
    onSelect: (sortOption: string) => void
    onClose: () => void
}


const SortMenu = forwardRef<HTMLFormElement, ISortMenuProps>(({onSelect, onClose}, ref) => {

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const [selectedOption, setSelectedOption] = useState('')

    const handleRadioChange = (value: string) => {
        setSelectedOption(value)
        sessionStorage.setItem('selectedSortOption', value)
        onSelect(value)
        onClose()
    }

    useEffect(() => {
        const savedSort = sessionStorage.getItem('selectedSortOption')
        if (savedSort) {
            setSelectedOption(savedSort)
        } else {
            setSelectedOption('default')
        }
    })


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
                    checked={selectedOption === 'default'}
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
                    checked={selectedOption === 'cheap'}
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
                    checked={selectedOption === 'expensive'}
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
                    checked={selectedOption === 'discount'}
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