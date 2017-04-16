/* eslint no-underscore-dangle: 0 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'

const reducer = combineReducers({
    ...reducers
})

const composeEnhancers =
    DEBUG && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose


export default composeEnhancers(applyMiddleware(thunkMiddleware))(createStore)(reducer, {})
