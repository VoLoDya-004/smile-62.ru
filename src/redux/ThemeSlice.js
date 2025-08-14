import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDarkTheme: localStorage.getItem('theme') === 'dark-theme' ? true : false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setIsDarkTheme(state, action) {
            state.isDarkTheme = action.payload

            if (action.payload) {
                document.body.classList.add('dark-theme')
                localStorage.setItem('theme', 'dark-theme')
            } else {
                document.body.classList.remove('dark-theme')
                localStorage.setItem('theme', 'light-theme')
            }
        },
    },
})

export const {setIsDarkTheme} = themeSlice.actions
export default themeSlice.reducer