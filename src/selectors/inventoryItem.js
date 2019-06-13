import {pathOr} from 'ramda'

export const getInventoryCollection = pathOr([], ['inventoryItem', 'collection'])