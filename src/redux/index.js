import { createStore } from 'redux'
import { combineReducers } from 'redux'
import customer from './reducers/customer'

export default createStore(combineReducers({
  customer,
}))