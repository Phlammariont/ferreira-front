import {pathOr} from 'ramda'

export const getQuotationCollection = pathOr([], ['quotation', 'collection'])