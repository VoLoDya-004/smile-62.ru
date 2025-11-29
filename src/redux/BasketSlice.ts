import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartItem } from '@/types/types'


interface ITotalState {
  count: number
  price_total: number
}

interface IBasketState {
  cartBasket: ICartItem[]
  total: ITotalState  
}


const initialState: IBasketState = {
  cartBasket: [],
  total: {
    count: 0,
    price_total: 0,
  },
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setCartBasket(state, action: PayloadAction<ICartItem[]>) {
      state.cartBasket = action.payload
      const newTotal = calculateTotal(action.payload)
      state.total = newTotal
    },
    updateTotal(state) {
      state.total = calculateTotal(state.cartBasket)
    },
  },
})

function calculateTotal(cartItems: ICartItem[]): ITotalState {
  const count = cartItems.reduce((sum, item) => sum + Number(item.count), 0)
  const price_total = cartItems.reduce(
    (sum, item) => sum + Number(item.price_total) * Number(item.count),
    0
  )
  return { count, price_total }
}

export const { setCartBasket, updateTotal } = basketSlice.actions
export default basketSlice.reducer








