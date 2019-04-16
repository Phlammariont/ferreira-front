import Model from '../components/crud/model'

const product = {
  name: 'Precio',
  fields: [
    {name: 'name', label: 'Producto'},
    {name: 'price', label: 'Precio'}
  ]
}


export default new Model(product)