import {quotation} from '../types'

export const setQuotationCollection = products => ({
  type: quotation.SET_COLLECTION,
  collection: products
})