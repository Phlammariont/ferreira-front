import {both, find, isEmpty, propEq} from 'ramda'
import createService from './general-model'
import firebaseService from './firebase'

const INVENTORY = 'inventoryItem'

const findOrCreate = async (inventoryItem, quantity) => {
  const existingInventory = await firebaseService.find({
    collection: INVENTORY,
    field: 'product',
    operator: '==',
    value: inventoryItem.product,
  })
  const inventories = find(both(propEq('fabric', inventoryItem.fabric), propEq('color', inventoryItem.color)), existingInventory)
  if (inventories && !isEmpty(inventories)) return inventories
  return await firebaseService.saveModel({model: inventoryItem, collection: INVENTORY})
}

export default {
  ...createService('inventoryItem'),
  findOrCreate,
}