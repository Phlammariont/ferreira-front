import Model from '../components/crud/model'

class Customer extends Model {
  name = 'Cliente'
  fields = [
    { name: 'id', label: 'Id', isHide: true },
    { name: 'name', label: 'Nombre' },
    { name: 'email', label: 'E-Mail' }
  ]
}

export default Customer