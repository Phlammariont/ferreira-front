import { getType } from '../../utils/ramda'
const defaultState = {
  collection: []
}


const productReducer = (state = defaultState, action) => {
  switch (getType(action)) {
    default:
      return state
  }
}

export default productReducer