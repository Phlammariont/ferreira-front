import {pathOr} from 'ramda'

export const getProductCollection = pathOr([], ['product', 'collection'])