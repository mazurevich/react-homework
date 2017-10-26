import { combineReducers } from 'redux'
import searchPageReducer from './searchPageReducer'
import filmPageReducer from './filmPageReducer'

const rootReducer = combineReducers({
  search: searchPageReducer,
  film: filmPageReducer,
})

export default rootReducer
