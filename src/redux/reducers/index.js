import { combineReducers } from 'redux'
import customer from './customer'
import product from './product'
import quotation from './quotation'
import inventoryItem from './inventory-item'
import purchase from './purchase'

const rootReducer  = combineReducers({
  customer,
  product,
  quotation,
  inventoryItem,
  purchase,
})

export default rootReducer
