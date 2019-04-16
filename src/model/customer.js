import Model from '../components/crud/model'

const customer = {
  name: 'Cliente',
  fields: [
    { name: 'name', label: 'Nombre' },
    { name: 'email', label: 'E-Mail' }
  ]
}

export default new Model(customer)