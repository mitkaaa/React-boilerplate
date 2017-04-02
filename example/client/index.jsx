import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

render(
    <Provider component={Provider} store={store}>
        <div>Hello world!</div>
    </Provider>
, document.getElementById('app'))
