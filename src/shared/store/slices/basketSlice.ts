import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IBasketState {
  addingIds: number[]
}

const initialState: IBasketState = {
  addingIds: []
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addAddingBasketId: (state, action: PayloadAction<number>) => {
      if (!state.addingIds.includes(action.payload)) {
        state.addingIds.push(action.payload)
      }
    },
    removeAddingBasketId: (state, action: PayloadAction<number>) => {
      state.addingIds = state.addingIds.filter(id => id !== action.payload)
    },
    clearAddingBasketIds: (state) => {
      state.addingIds = []
    },
  }
})

export const { addAddingBasketId, removeAddingBasketId, clearAddingBasketIds } = basketSlice.actions
export default basketSlice.reducer