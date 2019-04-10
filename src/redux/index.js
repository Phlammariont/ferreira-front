import { applyMiddleware, createStore } from 'redux'
import epics from '../epics'
import {createEpicMiddleware} from 'redux-observable'
import rootReducer from './reducers'

const createAppStore = initialState => {
  const epicMiddleware = createEpicMiddleware()
  const store = createStore(rootReducer, initialState, applyMiddleware(epicMiddleware))
  epicMiddleware.run(epics)
  return store
}

export default createAppStore