import { combineReducers } from "redux"
import { countReducer } from "./countReducer"

export const rootReducer = combineReducers({
    count: countReducer
})