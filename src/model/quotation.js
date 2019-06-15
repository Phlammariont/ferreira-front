import Model from '../components/crud/model'
import Customer from './customer'
import Product from './product'

class Quotation extends Model {
  name = 'quotation'
  label = 'Cotización'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'customer', label: 'Cliente', instanceOf: Customer },
    { name: 'products', label: 'Productos', instanceOf: [Product] }
  ]
}

export default Quotation
