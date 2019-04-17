import Model from '../components/crud/model'
import Customer from './customer'
import Product from './product'

class PriceEstimation extends Model {
  name = 'Cotización'
  fields = [
    { name: 'id', label: 'Id', isHide: true },
    { name: 'customer', label: 'Cliente', instanceOf: Customer },
    { name: 'products', label: 'Productos', instanceOf: [Product] }
  ]
}

export default PriceEstimation