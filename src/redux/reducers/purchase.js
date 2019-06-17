import { purchase } from '../actions/types'
import generalModelReducer from './general-model'
const defaultState = {
  collection: []
}

const purchaseReducer = (state = defaultState, action) => {
  return generalModelReducer(purchase, state, action)
}

export default purchaseReducer
