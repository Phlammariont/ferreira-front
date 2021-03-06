import Model from '../components/crud/model'
import Product from './product'

class InventoryItem extends Model {
  name = 'inventoryItem'
  label = 'Inventario'
  selectionField = 'product.name'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'product', label: 'Producto', instanceOf: Product },
    { name: 'value', label: 'Valor' },
    { name: 'fabric', label: 'Tela' },
    { name: 'color', label: 'Color' },
  ]

  toString() {
    return this.model.product.name
  }
}

export default InventoryItem