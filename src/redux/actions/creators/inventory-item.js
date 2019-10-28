import { inventoryItem } from '../types'
import { fetchCollection, saveModel, deleteModel } from './general-model'

export const saveInventory = saveModel(inventoryItem)

export const fetchInventory = fetchCollection(inventoryItem)

export const deleteInventory = deleteModel(inventoryItem)
