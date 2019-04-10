import customer from './customer'
import {combineEpics} from 'redux-observable'

export default combineEpics(customer)