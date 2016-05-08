import { combineReducers } from 'redux'
import todoReducer from './todoReducer'
import userReducer from './userReducer'
import searchReducer from './searchReducer'

const rootReducer = combineReducers({
	todos: todoReducer, 
	user: userReducer,
	search: searchReducer
})

export default rootReducer