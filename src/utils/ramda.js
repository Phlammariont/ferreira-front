import {path, prop} from 'ramda'

export const getType = prop('type')

export const getValue = path(['target', 'value'])
