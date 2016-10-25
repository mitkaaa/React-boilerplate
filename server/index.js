'use strict'

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const http = require('http')
const express = require('express')
const moment = require('moment')
const bodyParser =  require('body-parser')
const methodOverride =  require('method-override')
const morgan =  require('morgan')
const cookieParser = require('cookie-parser')
const config = require('./configuration')

const app = express()
const development = 'development'

const middlewaresPath = path.join(process.cwd(), config.PATH.APPSERVER, 'index.js')
const middlewares = fs.existsSync(middlewaresPath) ? require(middlewaresPath) : []

middlewares.map((middleware) => {
    middleware instanceof Array ?
        app.use(...middleware) : app.use(middleware)
})

app.set('env', process.env.NODE_ENV || development)
app.set('views', path.join(process.cwd(), config.PATH.TEMPLATE))
app.set('view engine', 'pug')
app.set('port', config.PORT)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cookieParser())
app.use(express.static(path.join(process.cwd(), config.PATH.STATIC)))

if (app.get('env') === development) {
    // development env
    app.use(morgan('tiny'))
} else {
    // production env
    app.use(compression())
}

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server is listening on port in ${chalk.blue(app.get('port'))} mode`)
    console.log(`${chalk.bold('NODE_ENV')}: ${app.get('env') === development ? chalk.yellow(app.get('env')) : chalk.blue(app.get('env'))}`)
    console.log(`${chalk.bold('    PORT')}: ${chalk.blue(app.get('port'))}`)
    console.log(`${chalk.bold('    DATE')}: ${chalk.green(moment().format('DD-MM-YYYY, h:MM:ss'))}`)
})

// app.use(require('./libs/react-router'))

// if (!process.env.NODE_ENV) {
//     require('../webpack/development.profile.js')
// }
// }


module.exports = app
