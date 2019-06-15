import customer from './customer'
import product from './product'
import inventoryItem from './inventory-item'
import {combineEpics} from 'redux-observable'

export default combineEpics(customer, product, inventoryItem)