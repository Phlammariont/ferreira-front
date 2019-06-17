import { purchase } from '../types'
import { fetchCollection, saveModel } from './general-model'

export const savePurchase = saveModel(purchase)

export const fetchPurchase = fetchCollection(purchase)
