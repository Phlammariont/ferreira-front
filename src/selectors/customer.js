import {pathOr} from 'ramda'

export const getCustomerCollection = pathOr([], ['customer', 'collection'])