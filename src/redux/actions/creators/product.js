import {product} from '../types'

export const fetchProducts = () => ({
  type: product.FETCH_COLLECTION
})

export const setProductCollection = products => ({
  type: product.SET_COLLECTION,
  collection: products
})