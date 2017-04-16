import React from 'react'
import PropTypes from 'prop-types'
import { Link, BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Main }  from './modules/main'

const application = ({ store }) => (
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Main}/>
                <Route path="/about" component={Main}/>
                <Route path="/topics" component={Main}/>
            </div>
        </BrowserRouter>
    </Provider>
)

application.propTypes = {
    store: PropTypes.object.isRequired
}

export default application
