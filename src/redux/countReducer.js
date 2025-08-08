import { SET_COUNT, INCREASE_COUNT, DECREASE_COUNT } from "./types"

const initialState = {
  count: 1
}

export const countReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCREASE_COUNT:
      return { ...state, count: Math.min(state.count + 1, 100) }
    case DECREASE_COUNT:
      return { ...state, count: Math.max(state.count - 1, 1) }
    case SET_COUNT:
      const newCount = Math.max(1, Math.min(action.payload.count, 100))
      return { ...state, count: newCount }
    default:
      return state
  }
}