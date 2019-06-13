import { inventory } from '../types'

export const saveInventory = newInventory => ({
  type: inventory.ADD_TO_COLLECTION,
  newInventory
})