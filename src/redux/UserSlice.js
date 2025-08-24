import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,      
  isAuth: false,
  userName: '',        
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
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