import Model from '../components/crud/model'
import Product from './product'

class InventoryItem extends Model {
  name = 'inventoryItem'
  label = 'Inventario'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'product', label: 'Productos', instanceOf: Product },
    { name: 'value', label: 'Valor' },
    { name: 'fabric', label: 'Tela' },
    { name: 'color', label: 'Color' },
  ]
}

export default InventoryItem