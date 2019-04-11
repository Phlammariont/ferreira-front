import { from } from 'rxjs';
import {  combineEpics, ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { setProductCollection } from '../redux/actions/creators/product'
import { createExternalError } from '../redux/actions/creators/errors'
import { product } from '../redux/actions/types'
import priceService from '../service/price-service'

export const productEpic = action$ => action$.pipe(
  ofType(product.FETCH_COLLECTION),
  mergeMap(  () => {
    return from(priceService.get()).pipe(
      catchError(createExternalError),
      map(setProductCollection)
    )
  })
)

export default combineEpics(productEpic)