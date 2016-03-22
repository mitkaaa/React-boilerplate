import React from 'react'
import { Route, IndexRoute } from 'react-router'
import TestRoute from './modules/test'
// import ReactDOM from 'react-dom'
// import createHistory from 'history/lib/createBrowserHistory'

import Main from './modules/main/index.jsx'

export default (
    <Route path="/" component={ Main.Template }>
        <IndexRoute component={ Main.viewMain } />
        {TestRoute}
    </Route>
)
