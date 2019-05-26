import firebaseService from './firebase'


const save = (customer) => {
  firebaseService.saveModel({collection: 'customer', model: customer})
}

const get = async () => {
  return await firebaseService.getModel('customer')
}

const onAdd = (callback) => {
  return firebaseService.addCallback('customer', 'add', callback)
}

export default {
  save,
  get,
  onAdd
}