import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IFav } from '@/features/favourites/types/favouritesTypes'

interface IFavouritesState {
  cartFavourites: IFav[]
}

const initialState: IFavouritesState = {
  cartFavourites: [],
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setCartFavourites(state, action: PayloadAction<IFav[]>) {
      state.cartFavourites = action.payload
    },
  },
})

export const { setCartFavourites } = favouritesSlice.actions
export default favouritesSlice.reducer
