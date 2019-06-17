import {  combineEpics, ofType } from 'redux-observable'
import { from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import { createExternalError } from '../redux/actions/creators/errors'
import {addModelToCollection, setModelCollection} from '../redux/actions/creators/general-model'
import modelService from '../service/general-model.js'

const fetchEpic = (modelName, modelActions) => action$ => action$.pipe(
  ofType(modelActions.FETCH_COLLECTION),
  mergeMap(  () => {
    return from(modelService(modelName).get()).pipe(
      catchError(createExternalError),
      map(setModelCollection(modelActions))
    )
  })
)

const addEpic = (modelName, modelActions) => action$ => action$.pipe(
  ofType(modelActions.ADD_TO_COLLECTION),
  mergeMap(  action => {
    return from(modelService(modelName).save(action.model)).pipe(
      catchError(createExternalError),
      map(addModelToCollection(modelActions))
    )
  })
)

const genericEpicCreator = ({model, types}) => combineEpics(fetchEpic(new model().name, types), addEpic(new model().name, types))

export default genericEpicCreator
