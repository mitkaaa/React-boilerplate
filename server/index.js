'use strict'

require('babel-core/register')
require('./resolve')
require('./libs/mongoose')
require.extensions['.css'] = () => '' // NO CSS!

const config = require('../config.js')
const http = require('http')
const moment = require('moment')
const server = require('./libs/server')
const routes = require('./routes')

module.exports = server(config.port, (express, app) => {

    app.use(express.static(config.PATH.STATIC))
    app.set('views', `${config.PATH.FRONTSIDE}/../template/`)
    app.set('view engine', 'pug')

    http.createServer(app).listen(app.get('port'), () => {
        console.log(`Express server is listening on port in ${app.get('port')} mode`)
        console.log(`- NODE_ENV = ${process.env.NODE_ENV}`)
        console.log(`- PORT = ${app.get('port')}`)
        console.log('- Date = ' + moment().format('DD-MM-YYYY, h:MM:ss') + '\n')
    })

    routes.default(app)

    app.use(require('./libs/react-router'))

    if (!process.env.NODE_ENV) {
        require('../webpack/development.profile.js')
    }
})
