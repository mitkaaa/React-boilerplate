'use strict'

import http from 'http'
import moment from 'moment'
import server from './libs/server'
import isomorphic from './libs/isomorphic'
import config from '../config.js'

server(config.port, (express, app) => {
    
    if (process.env.NODE_ENV == 'development') {
        const webpackDevServer = require('./libs/webpackDevServer')
        app.use(webpackDevServer.webpackDev)
        app.use(webpackDevServer.webpackHot)
    }
    
    app.use(express.static(config.PATH.STATIC))

    app.set('views', `${config.PATH.FRONTSIDE} /../template/`)
    app.set('view engine', 'jade')

    http.createServer(app).listen(app.get('port'), () => {
        console.log(`Express server is listening on port in ${app.get('port')} mode`)
        console.log(`- NODE_ENV = ${process.env.NODE_ENV}`)
        console.log(`- PORT = ${app.get('port')}`)
        console.log("- Date = " + moment().format("DD-MM-YYYY, h:MM:ss") + "\n")
    })
    
    app.use(isomorphic)

})

export default {
    server
}
