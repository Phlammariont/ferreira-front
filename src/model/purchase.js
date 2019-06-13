import Model from '../components/crud/model'
import Customer from './customer'
import InventoryItem from './inventory-item'

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