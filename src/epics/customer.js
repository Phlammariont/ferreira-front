import { customer } from '../redux/actions/types'
import customerService from '../service/customer'
import {  combineEpics, ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { setCustomerCollection } from '../redux/actions/creators/customer'
import { createExternalError } from '../redux/actions/creators/errors'
import { from } from 'rxjs';

export const customerEpic = action$ => action$.pipe(
  ofType(customer.FETCH_COLLECTION),
  mergeMap(  () => {
    return from(customerService.get()).pipe(
      catchError(createExternalError),
      map(setCustomerCollection)
    )
  })
)

export default combineEpics(customerEpic)