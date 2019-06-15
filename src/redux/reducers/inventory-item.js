import { inventoryItem } from '../actions/types'
import generalModelReducer from './general-model'
const defaultState = {
  collection: []
}

const inventoryItemReducer = (state = defaultState, action) => {
  return generalModelReducer(inventoryItem, state, action)
}

export default inventoryItemReducer
