import {useSelector} from "react-redux"
import { forwardRef } from "react"


const SortMenu = forwardRef(({onSelect}, ref) => {

    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)

    const handleRadioChange = (value) => {
        if (onSelect) {
            onSelect(value)
        }
    }


    return (
        <form className={`sortMenu ${isDarkTheme ? 'dark-theme' : ''}`} ref={ref}>
            <label 
                htmlFor="sortMenu1" 
                className={`sortOption ${isDarkTheme ? 'dark-theme' : ''}`} 
                style={{borderRadius: "15px 15px 0 0"}}
            >
                <input type="radio" id="sortMenu1" name="sortOptions" onChange={() => 
                    handleRadioChange("default")} />
                По умолчанию
            </label>
            <label 
                htmlFor="sortMenu2" 
                className={`sortOption ${isDarkTheme ? 'dark-theme' : ''}`} ref={ref}
            >
                <input type="radio" id="sortMenu2" name="sortOptions" onChange={() => 
                    handleRadioChange("cheap")} />
                Дешевле
            </label>
            <label 
                htmlFor="sortMenu3" 
                className={`sortOption ${isDarkTheme ? 'dark-theme' : ''}`}
            >
                <input type="radio" id="sortMenu3" name="sortOptions" onChange={() => 
                    handleRadioChange("expensive")} />
                Дороже
            </label>
            <label 
                htmlFor="sortMenu4" 
                className={`sortOption ${isDarkTheme ? 'dark-theme' : ''}`}
                style={{borderRadius: "0 0 15px 15px"}}
            >
                <input type="radio" id="sortMenu4" name="sortOptions" onChange={() => 
                    handleRadioChange("discount")} />
                По скидке (%)
            </label>
        </form>
    )
})

export default SortMenu