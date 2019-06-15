import firebaseService from './firebase'

const save = collection => (model) => {
  return firebaseService.saveModel({collection, model})
}

const get = collection => () => {
  return firebaseService.getCollection(collection)
}

const service = modelName => ({
  save: save(modelName),
  get: get(modelName)
})

export default service