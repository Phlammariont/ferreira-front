import Model from '../components/crud/model'
import customer from './customer'
import product from './product'

const priceEstimation = {
  name: 'Cotización',
  fields: [
    { name: 'customer', label: 'Cliente', instanceOf: customer },
    { name: 'product', label: 'Productos', instanceOf: product }
  ]
}

export default new Model(priceEstimation)