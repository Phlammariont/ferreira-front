export const fetchCollection = ({FETCH_COLLECTION}) => () => ({
  type: FETCH_COLLECTION
})

export const setModelCollection = ({SET_COLLECTION}) => collection => ({
  type: SET_COLLECTION,
  collection
})

export const addModelToCollection = ({ADD_TO_COLLECTION_SUCCESS}) => model => ({
  type: ADD_TO_COLLECTION_SUCCESS,
  model
})

export const saveModel = ({ADD_TO_COLLECTION}) => model => ({
  type: ADD_TO_COLLECTION,
  model
})
