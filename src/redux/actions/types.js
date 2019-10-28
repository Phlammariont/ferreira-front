import InventoryItem from '../../model/inventory-item'
import Customer from '../../model/customer'
import Product from '../../model/product'
import Quotation from '../../model/quotation'
import Purchase from '../../model/purchase'

const getCrudActions =( model ) => ({
  SET_COLLECTION: `${model.toUpperCase()}.SET_COLLECTION`,
  FETCH_COLLECTION: `${model.toUpperCase()}.FETCH_COLLECTION`,
  ADD_TO_COLLECTION: `${model.toUpperCase()}.ADD_TO_COLLECTION`,
  ADD_TO_COLLECTION_SUCCESS: `${model.toUpperCase()}.ADD_TO_COLLECTION_SUCCESS`,
  DELETE_FROM_COLLECTION: `${model.toUpperCase()}.DELETE_FROM_COLLECTION`,
  DELETE_FROM_COLLECTION_SUCCESS: `${model.toUpperCase()}.DELETE_FROM_COLLECTION_SUCCESS`,
})

export const error = {
  EXTERNAL: 'ERROR.EXTERNAL'
}

export const customer = getCrudActions(new Customer().name)
export const product = getCrudActions(new Product().name)
export const quotation = getCrudActions(new Quotation().name)
export const inventoryItem = getCrudActions(new InventoryItem().name)
export const purchase = getCrudActions(new Purchase().name)
