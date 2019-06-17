import { purchase } from '../redux/actions/types'
import genericEpicCreator from './general-model'
import Purchase from '../model/purchase'

export default genericEpicCreator({model: Purchase, types: purchase})
