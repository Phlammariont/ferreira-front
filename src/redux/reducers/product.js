import { getType } from '../../utils/ramda'
import { product } from '../actions/types'
const defaultState = {
  collection: []
}


const productReducer = (state = defaultState, action) => {
  switch (getType(action)) {
    case product.SET_COLLECTION:
      return {
        ...state,
        collection: action.collection
      }
    default:
      return state
  }
}

export default productReducer