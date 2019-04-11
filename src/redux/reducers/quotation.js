import { getType } from '../../utils/ramda'
import { quotation } from '../actions/types'
const defaultState = {
  collection: []
}


const quotationReducer = (state = defaultState, action) => {
  switch (getType(action)) {
    case quotation.SET_COLLECTION:
      return {
        ...state,
        collection: action.collection
      }
    default:
      return state
  }
}

export default quotationReducer