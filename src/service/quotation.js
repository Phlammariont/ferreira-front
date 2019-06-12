import firebaseService from './firebase'


const save = (quotation) => {
  firebaseService.saveModel({collection: 'quotation', model: quotation})
}

const get = async () => {
  return await firebaseService.getCollection('quotation')
}

const onAdd = (callback) => {
  return firebaseService.addCallback('quotation', 'add', callback)
}

export default {
  save,
  get,
  onAdd
}