import { combineReducers } from 'redux'
import customer from './customer'
import product from './product'
import quotation from './quotation'
import inventoryItem from './inventory-item'

const rootReducer  = combineReducers({
  customer,
  product,
  quotation,
  inventoryItem,
})

export default rootReducer
