import customer from './customer'
import product from './product'
import inventoryItem from './inventory-item'
import purchase from './purchase'
import {combineEpics} from 'redux-observable'

export default combineEpics(customer, product, inventoryItem, purchase)
