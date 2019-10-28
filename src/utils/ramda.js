import {path, prop, propEq} from 'ramda'

export const getType = prop('type')

export const getValue = path(['target', 'value'])

export const isDeleted = propEq('isDeleted', true)
