import React from 'react'
import { Router } from 'react-router'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import route from './route.jsx'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import * as reducers from './reducers'
// import { fromJS } from 'immutable'
// import promiseMiddleware   from './libs/promiseMiddleware'


let initialState = window.__INITIAL_STATE__
// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
// Object
//   .keys(initialState)
//   .forEach(key => {
//     initialState[key] = fromJS(initialState[key]);
//   });
// const reducer = combineReducers(reducers)
// const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState)

ReactDOM.render(
    <Provider store={store}>
        <Router children={route} history={createHistory()} />
    </Provider>
    , document.getElementById('application'))
