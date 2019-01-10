import {firebaseService} from './firebase'


const save = (price) => {
  firebaseService.saveModel({collection: 'price-list', model: price})
}

const getPrices = async () => {
  return await firebaseService.getModel('price-list')
}

export default {
  save,
  getPrices
}