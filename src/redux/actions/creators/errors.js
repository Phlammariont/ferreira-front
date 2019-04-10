import { error } from '../types'

export const createExternalError = (e) => {
  console.log(e)
  return ({
    type: error.EXTERNAL,
    error: e
  })
}