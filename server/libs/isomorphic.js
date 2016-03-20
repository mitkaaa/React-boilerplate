import config from '../../config'

import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import DocumentTitle from 'react-document-title'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createLocation            from 'history/lib/createLocation'

import fetchComponentData from './fetchComponentData'

import { store } from '__data__'

// import mongoose from 'mongoose'

const routes = require(config.PATH.FRONTSIDE + '/route.jsx')


export default (req, res) => {
    const location = createLocation(req.url).pathname
    match({ routes, location }, (error, redirectLocation, renderProps) => {
    console.log(routes, location, error, redirectLocation, renderProps)
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            
            // function userAuth (callback) {
            //  if (!req.user) return callback(true, null)

            //  const User = mongoose.model('User')
            //  const options = {
            //             criteria: {
            //                 _id: req.user.id
            //             },
            //             select: 'name username email hashed_password'
            //         }
                
            //     User.load(options, callback)
            // }
            
            fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
                .then(() => {
                    // userAuth((err, user) => {
                    const InitialView = (<Provider store={ store }><RoutingContext {...renderProps} /></Provider>)
                    const componentHTML = renderToString(InitialView)
                    let state = store.getState()
                    // state.user = user || {}
                    res.status(200).render('index', {
                        app: componentHTML,
                        title: DocumentTitle.rewind(),
                        initialState: state
                    })

                    // })
                })
                .catch((err) => res.end(err.message))
            
            
        } else {
            res.status(404).send('Not found')
        }
    })
}
