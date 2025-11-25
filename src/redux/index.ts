import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './BasketSlice'
import favouritesReducer from './FavouritesSlice'
import themeReducer from './ThemeSlice'
import userReducer from './UserSlice'


export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
    user: userReducer,
    favourites: favouritesReducer,
  }, 
})

export type RootStore = ReturnType<typeof store.getState>
