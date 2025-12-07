import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '@/redux/BasketSlice'
import favouritesReducer from '@/redux/FavouritesSlice'
import themeReducer from '@/redux/ThemeSlice'
import userReducer from '@/redux/UserSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
    user: userReducer,
    favourites: favouritesReducer,
  }, 
})

export type RootStore = ReturnType<typeof store.getState>
