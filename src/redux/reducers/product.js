import { product } from '../actions/types'
import generalModelReducer from './general-model'
const defaultState = {
  collection: []
}

const productReducer = (state = defaultState, action) => {
  return generalModelReducer(product, state, action)
}

export default productReducer
