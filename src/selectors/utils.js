import { pathOr } from 'ramda'


export const getCollection = name => pathOr([], [name, 'collection'])
