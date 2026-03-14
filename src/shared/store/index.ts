import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import basketReducer from './slices/basketSlice'
import favouritesReducer from './slices/favouritesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
    favourites: favouritesReducer,
  }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
