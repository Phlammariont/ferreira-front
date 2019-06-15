import { inventoryItem } from '../types'
import {fetchCollection, saveModel} from './general-model'

export const saveInventory = saveModel(inventoryItem)

export const fetchInventory = fetchCollection(inventoryItem)
