import {product} from '../types'
import {fetchCollection} from './general-model'

export const fetchProducts = fetchCollection(product)
