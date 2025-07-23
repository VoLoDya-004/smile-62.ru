// import { INCREMENT, DECREMENT, SET_COUNT } from "./types"

// export function incrementCount () {
//     return {
//         type: INCREMENT
//     }
// }

// export function decrementCount () {
//     return {
//         type: DECREMENT
//     }
// }

// export function setCount (count) {
//     return {
//         type: SET_COUNT,
//         payload: count
//     }
// }




import { INCREASE_COUNT, DECREASE_COUNT, SET_COUNT } from "../redux/types"
import axios from 'axios'

const API_BASE = "http://localhost:3000/src/PHP/basket.php"


export const increaseCount = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`${API_BASE}?idProduct=${id}&Operation=increaseBasket`)
      dispatch({ type: INCREASE_COUNT, payload: id })
    } catch (error) {
      console.error(error)
    }
  }
}

export const decreaseCount = (id) => {
  return async (dispatch) => {
    try {
      await axios.get(`${API_BASE}?idProduct=${id}&Operation=decreaseBasket`)
      dispatch({ type: DECREASE_COUNT, payload: id })
    } catch (error) {
      console.error(error)
    }
  }
}

export const setCount = (id, count) => {
  return async (dispatch) => {
    try {
      await axios.get(`${API_BASE}?idProduct=${id}&Operation=updateCount&count=${count}`)
      dispatch({ type: SET_COUNT, payload: { id, count } })
    } catch (error) {
      console.error(error)
    }
  }
}