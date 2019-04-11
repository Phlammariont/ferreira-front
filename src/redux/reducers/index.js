import { combineReducers } from 'redux'
import customer from './customer'
import product from './product'
import quotation from './quotation'

const rootReducer  = combineReducers({
  customer,
  product,
  quotation
})

export default rootReducer