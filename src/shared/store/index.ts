import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/BasketSlice'
import themeReducer from './slices/ThemeSlice'
import userReducer from './slices/UserSlice'
import favouritesReducer from './slices/FavouritesSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
    user: userReducer,
    favourites: favouritesReducer,
  }, 
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
