import Model from '../components/crud/model'
import Customer from './customer'
import InventoryItem from './inventory-item'
import {isNil} from 'ramda'

class Purchase extends Model {
  name = 'purchase'
  label = 'Negocio'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'customer', label: 'Cliente', instanceOf: Customer },
    { name: 'products', label: 'Productos', instanceOf: [InventoryItem] },
    { name: 'total', label: 'Total' },
  ]
}

export default Purchase

export const isValidPurchase = purchase => {
  if(isNil(purchase)) return false
  if(isNil(purchase.items) || purchase.items.length < 1) return false
  if(isNaN(purchase.price) || Number(purchase.price) < 0) return false
  return true
}