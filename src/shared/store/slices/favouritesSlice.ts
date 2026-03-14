import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IFavouritesState {
  addingIds: number[]
}

const initialState: IFavouritesState = {
  addingIds: []
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addAddingFavId: (state, action: PayloadAction<number>) => {
      if (!state.addingIds.includes(action.payload)) {
        state.addingIds.push(action.payload)
      }
    },
    removeAddingFavId: (state, action: PayloadAction<number>) => {
      state.addingIds = state.addingIds.filter(id => id !== action.payload)
    },
    clearAddingFavIds: (state) => {
      state.addingIds = []
    },
  }
})

export const { addAddingFavId, removeAddingFavId, clearAddingFavIds } = favouritesSlice.actions
export default favouritesSlice.reducer