import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
  userId: number | null
  isAuth: boolean
  userName: string
}

const initialState: IUserState = {
  userId: null,      
  isAuth: false,
  userName: '',        
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{userId: number; userName: string; isAuth: boolean}>) {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.isAuth = true
    },
    logoutUser(state) {
      state.userId = null
      state.userName = ''
      state.isAuth = false
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer

