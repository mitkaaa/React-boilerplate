import React from 'react'
import { Router } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

render(
    <Provider component={Provider} store={store}>
        <div>123123 123 123 123 123</div>
    </Provider>
, document.getElementById('app'))