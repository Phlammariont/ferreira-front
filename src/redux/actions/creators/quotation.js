import {product} from '../types'

export const setQuotationCollection = products => ({
  type: product.SET_COLLECTION,
  collection: products
})