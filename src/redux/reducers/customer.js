import { getType } from '../../utils/ramda'
import { customer } from '../actions/types'
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
    case customer.FETCH_COLLECTION:
      return state
    case customer.ADD_TO_COLLECTION:
      return {
        ...state,
        collection: [...state.collection, ...action.collection]
      }
    default:
      return state
  }
}

export default customerReducer