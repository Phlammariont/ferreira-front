const getCrudActions =( model ) => ({
  SET_COLLECTION: `${model.toUpperCase()}.SET_COLLECTION`,
  FETCH_COLLECTION: `${model.toUpperCase()}.FETCH_COLLECTION`,
  ADD_TO_COLLECTION: `${model.toUpperCase()}.ADD_TO_COLLECTION`
})

export const error = {
  EXTERNAL: 'ERROR.EXTERNAL'
}

export const customer = getCrudActions('customer')
export const product = getCrudActions('product')
export const quotation = getCrudActions('quotation')
export const inventory = getCrudActions('inventory')
