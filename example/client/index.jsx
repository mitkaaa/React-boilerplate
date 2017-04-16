import React from 'react'
import { store } from './store'

import { render } from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { createHashHistory } from 'history'
import { stringify, parse } from 'qs'

import Root from './main.jsx'

const renderApp = (RootComponent) => render(
    <AppContainer><RootComponent store={store} /></AppContainer>
    , document.getElementById('app'))

renderApp(Root)

if (module.hot) {
    module.hot.accept('./main', () => renderApp(require('./main').default))
}
