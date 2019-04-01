import { getType } from '../../utils/ramda'
import { customer } from '../actions/action-types'
const defaultState = {
  collection: []
}


const customerReducer = (state = defaultState, action) => {
  switch (getType(action)) {
    case customer.SET_COLLECTION:
      return {
        ...state,
        collection: action.collection
      }
    default:
      return state
  }
}

export default customerReducer