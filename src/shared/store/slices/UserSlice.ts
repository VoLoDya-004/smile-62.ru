import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,      
  isAuth: false,
  userName: '',     
  isAdmin: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin || false
    },
    logoutUser(state) {
      state.userId = null
      state.userName = ''
      state.isAuth = false
      state.isAdmin = false
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer

