import firebaseService from './firebase'
import { isEmpty } from 'ramda'

const PRODUCT = 'product'

const save = (price) => {
  firebaseService.saveModel({collection: PRODUCT, model: price})
}

const get = async () => {
  return await firebaseService.getCollection(PRODUCT)
}

const onAdd = (callback) => {
  return firebaseService.addCallback(PRODUCT, 'add', callback)
}

const findOrCreate = async product => {
  const existingProduct = await firebaseService.find({
    collection: PRODUCT,
    field: 'name',
    operator: '==',
    value: product.name
  })
  if (existingProduct && !isEmpty(existingProduct)) return existingProduct[0]

  return await firebaseService.saveModel({model: product, collection: PRODUCT})
}

export default {
  save,
  get,
  onAdd,
  findOrCreate,
}