import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import userReducer from './userReducer'
import pageReducer from './pageReducer'

const rootReducer = combineReducers({
	search: searchReducer,
	user: userReducer,
	page: pageReducer
})

export default rootReducer