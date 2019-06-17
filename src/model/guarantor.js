import Model from '../components/crud/model'

class Guarantor extends Model {
  name = 'guarantor'
  label = 'Codeudor'
  fields = [
    { name: 'uid', label: 'Id', isHide: true },
    { name: 'name', label: 'Nombre' },
    { name: 'email', label: 'E-Mail' },
    { name: 'legalId', label: 'Cédula' },
    { name: 'city', label: 'Ciudad' },
    { name: 'address', label: 'Dirección' },
    { name: 'neighborhood', label: 'Barrio' },
    { name: 'phone', label: 'Teléfono '},
  ]
}

export default Guarantor