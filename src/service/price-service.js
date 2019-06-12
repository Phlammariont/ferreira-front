import firebaseService from './firebase'


const save = (price) => {
  firebaseService.saveModel({collection: 'price-list', model: price})
}

const get = async () => {
  return await firebaseService.getCollection('price-list')
}

const onAdd = (callback) => {
  return firebaseService.addCallback('price-list', 'add', callback)
}

export default {
  save,
  get,
  onAdd
}