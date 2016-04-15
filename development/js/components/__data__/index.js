import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as Reducers from './reducers'
import promiseMiddleware from 'utils/promiseMiddleware'
import * as Actions from './actions'

const reducer = combineReducers(Reducers)

let initialState = process.env.BROWSER ? window.__INITIAL_STATE__ : {}

export const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState)
export { Actions, Reducers }