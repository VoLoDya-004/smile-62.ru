import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './BasketSlice'
import themeReducer from './ThemeSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
  },
})