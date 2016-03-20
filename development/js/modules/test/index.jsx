import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'


import TestComponent from './test.jsx'

// component={UserComponent}
export default (
    <Route path="test">
        <IndexRoute component={TestComponent} />
    </Route>
)
