'use strict'

import http from 'http'
import server from './libs/server'
import isomorphic from './libs/isomorphic'
import config from '../config'


server(config.port,function(express,app){
	app.use(express.static(config.PATH.STATIC))
	
	app.set('views', config.PATH.STATIC)
	app.set('view engine', 'jade')
	
	http.createServer(app).listen(app.get('port'), function(){
		console.log(`Express server is listening on port in ${app.get('port')} mode`)
	})
	
	
	require(config.PATH.API+'/passport/node')(app)
	
	
	app.use(isomorphic)
	
})

export default {
	server
}