import customer from './customer'
import product from './product'
import {combineEpics} from 'redux-observable'

export default combineEpics(customer, product)