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

export const removeModelFromCollection = ({DELETE_FROM_COLLECTION_SUCCESS}) => model => ({
  type: DELETE_FROM_COLLECTION_SUCCESS,
  model
})

export const deleteModel = ({DELETE_FROM_COLLECTION}) => model => ({
  type: DELETE_FROM_COLLECTION,
  model
})
