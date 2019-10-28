import firebaseService from './firebase'

const save = collection => (model) => {
  return firebaseService.saveModel({collection, model})
}

const get = collection => () => {
  return firebaseService.getCollection(collection)
}

const deleteModel = collection => (model) => {
  return firebaseService.deleteModel({collection, model})
}

const find = collection => ({field, operator, value}) => {
  return firebaseService.find({collection, field, operator, value})
}

const service = modelName => ({
  save: save(modelName),
  get: get(modelName),
  delete: deleteModel(modelName),
  find: find(modelName)
})

export default service