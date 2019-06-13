import Model from '../components/crud/model'

class Product extends Model {
  name = 'product'
  label = 'Precio'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    {name: 'name', label: 'Producto'},
    {name: 'price', label: 'Precio'},
  ]
}


export default Product