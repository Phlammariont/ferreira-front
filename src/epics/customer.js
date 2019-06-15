import { customer } from '../redux/actions/types'
import { combineEpics } from 'redux-observable'
import genericEpicCreator from './general-model'
import Customer from '../model/customer'

export default combineEpics(genericEpicCreator({model: Customer, types: customer}))
