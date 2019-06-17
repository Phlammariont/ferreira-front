import firebaseService from './firebase'


const save = (price) => {
  firebaseService.saveModel({collection: 'product', model: price})
}

const get = async () => {
  return await firebaseService.getCollection('product')
}

const onAdd = (callback) => {
  return firebaseService.addCallback('product', 'add', callback)
}

export default {
  save,
  get,
  onAdd
}