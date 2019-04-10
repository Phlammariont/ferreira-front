import { combineReducers } from 'redux'
import customer from './customer'
import product from './product'

const rootReducer  = combineReducers({
  customer,
  product
})

export default rootReducer