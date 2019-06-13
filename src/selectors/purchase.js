import {pathOr} from 'ramda'


export const getPurchaseCollection = pathOr([], ['purchase', 'collection'])