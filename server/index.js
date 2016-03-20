'use strict'

import http from 'http'
import server from './libs/server'
import isomorphic from './libs/isomorphic'
import config from '../config.js'


server(config.port, (express, app) => {
    app.use(express.static(config.PATH.STATIC))

    app.set('views', config.PATH.FRONTSIDE + '/../template/')
    app.set('view engine', 'jade')

    http.createServer(app).listen(app.get('port'), () => {
        console.log(`Express server is listening on port in ${app.get('port')} mode`)
    })


    // app.get('/', (req, res) => {
    //  res.status(200).render('index', {
    //      // app: componentHTML,
    //      // title: DocumentTitle.rewind(),
    //      initialState: {}
    //  })
    // })

    app.use(isomorphic)

})

export default {
    server
}
