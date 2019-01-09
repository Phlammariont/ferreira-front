import {firebaseService} from './firebase'


const save = (model) => {
  firebaseService.savePrice(model)
}

export default {
  save
}