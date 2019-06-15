import {getType} from '../../utils/ramda'

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
    default:
      return state
  }
}

export default generalModelReducer
