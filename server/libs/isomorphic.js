import config from '../../config'

import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Resolver } from "react-resolver";
import DocumentTitle from 'react-document-title'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import fetchComponentData from './fetchComponentData'
import promiseMiddleware from './promiseMiddleware';

import routes from '../../Front-side/route.jsx';


//import * as reducers from config.PATH.FRONTSIDE+'/reducers'


const reducers = require(config.PATH.FRONTSIDE+'/reducers')
const reducer  = combineReducers(reducers);
const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);



export default (req,res)=>{
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
		
			const InitialView =	(<Provider store={store}><RoutingContext {...renderProps}/></Provider>)
			const componentHTML = renderToString(InitialView)
      		const initialState = store.getState()

			
			res.status(200).render('index', {
				app: componentHTML,
				title: DocumentTitle.rewind(),
				initialState: initialState
			})
		
		

		// Resolver
		// 	.resolve(() => <Provider store={store}><RoutingContext {...renderProps}/></Provider>)
		// 	.then(({ Resolved, data }) => {
				
		// 		res.status(200).render('index',{
		// 			app: renderToStaticMarkup(<Resolved />),
		// 			title: DocumentTitle.rewind()
		// 		})
				
		//     })
		//     .catch((error) => {
		// 	      res.status(500).send(error)
		//     });
			
			
		} else {
			res.status(404).send('Not found')
		}
	})
}