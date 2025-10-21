import {useSelector} from 'react-redux'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import type { RootStore } from '../../../redux'
import { useSearchParams } from 'react-router-dom'
import { Context } from '../../../contexts/context'


interface ISortMenuProps {
    onSelect: (sortOption: string) => void
    onClose: () => void
}


const SortMenu = forwardRef<HTMLFormElement, ISortMenuProps>(({onSelect, onClose}, ref) => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('Context must be used within a Provider')
    }

    const {setSearchParams} = context

    const [searchParams] = useSearchParams()

    const isDarkTheme = useSelector((state: RootStore) => state.theme.isDarkTheme)

    const [selectedOption, setSelectedOption] = useState(() => {
        return searchParams.get('sort') || 'default'
    })

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

    const handleKeyDown = (event: React.KeyboardEvent, value: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
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
                htmlFor='sort-menu1' 
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`} 
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'default')}
                ref={firstRadioRef}
            >
                <input 
                    checked={selectedOption === 'default'}
                    name='sortOptions'
                    type='radio'
                    id='sort-menu1'
                    onChange={() => handleRadioChange('default')} 
                    tabIndex={-1}
                />
                По умолчанию
            </label>
            <label 
                htmlFor='sort-menu2' 
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'cheap')}
            >
                <input 
                    checked={selectedOption === 'cheap'}
                    type='radio'
                    id='sort-menu2' 
                    name='sortOptions'
                    onChange={() => handleRadioChange('cheap')}
                    tabIndex={-1}
                />
                Дешевле
            </label>
            <label 
                htmlFor='sort-menu3'
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'expensive')}
            >
                <input 
                    checked={selectedOption === 'expensive'}
                    name='sortOptions' 
                    type='radio'
                    id='sort-menu3'
                    onChange={() => handleRadioChange('expensive')} 
                    tabIndex={-1}
                />
                Дороже
            </label>
            <label 
                htmlFor='sort-menu4'
                className={`sort-option ${isDarkTheme ? 'dark-theme' : ''}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'discount')}
            >
                <input 
                    checked={selectedOption === 'discount'}
                    type='radio'
                    id='sort-menu4'
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











