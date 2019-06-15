import {product} from '../redux/actions/types'
import genericEpicCreator from './general-model'
import Product from '../model/product'

export default genericEpicCreator({model: Product, types: product})
