import React from 'react'
import { Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
// import createHistory from 'history/lib/createBrowserHistory'
import route from './route.jsx'

import { Provider } from 'react-redux'
import { fromJS } from 'immutable'

import { store } from '__data__'


ReactDOM.render(
    <Provider store={store}>
        <Router children={route} history={browserHistory} />
    </Provider>
    , document.getElementById('application'))
