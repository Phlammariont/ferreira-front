import Model from '../components/crud/model'

class Customer extends Model {
  name = 'Cliente'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'email', label: 'E-Mail' },
    { name: 'legalId', label: 'Cedula' },
    { name: 'name', label: 'Nombre' },
  ]
}

export default Customer