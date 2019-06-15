import { getType } from '../../utils/ramda'
import { customer } from '../actions/types'
import generalModelReducer from './general-model'
const defaultState = {
  collection: []
}

const customerReducer = (state = defaultState, action) => {
  switch (getType(action)) {
    default:
      return generalModelReducer(customer, state, action)
  }
}

export default customerReducer
