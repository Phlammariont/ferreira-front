import { quotation } from '../actions/types'
import generalModelReducer from './general-model'
const defaultState = {
  collection: []
}

const quotationReducer = (state = defaultState, action) => {
  return generalModelReducer(quotation, state, action)
}

export default quotationReducer
