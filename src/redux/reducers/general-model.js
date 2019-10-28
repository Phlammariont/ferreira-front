import {getType} from '../../utils/ramda'
import {reject, propEq} from 'ramda'

const generalModelReducer = (actionTypes, state, action) => {
  switch (getType(action)) {
    case actionTypes.SET_COLLECTION:
      return {
        ...state,
        collection: action.collection
      }
    case actionTypes.ADD_TO_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: [...state.collection, action.model]
      }
    case actionTypes.DELETE_FROM_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: reject(propEq('uid', action.model.uid), state.collection)
      }
    default:
      return state
  }
}

export default generalModelReducer
