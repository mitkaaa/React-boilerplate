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
const compression = require('compression')
const Table = require('cli-table')
const config = require('./configuration')

const app = express()
const development = 'development'

// const middlewaresPath = path.join(process.cwd(), config.PATH.APPSERVER, 'index.js')
// const middleware = fs.existsSync(middlewaresPath) ? require(middlewaresPath) : {}
// app.use(middleware)

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
    const table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''} })
    table.push(
        [`${chalk.bold('NODE_ENV')}`, `${app.get('env') === development ? chalk.yellow(app.get('env')) : chalk.green(app.get('env'))}`]
      , [`${chalk.bold('PORT')}`, `${chalk.green(app.get('port'))}`]
      , [`${chalk.bold('DATE')}`, `${chalk.green(moment().format('DD-MM-YYYY, HH:MM:ss'))}`]
    )
    console.log(table.toString())
})

// app.get('/', (req, res) => res.render('index', {
//     production: app.get('env') !== development,
//     dev: app.get('env') === development ? 'http://localhost:' + config.PORTWEBPACKDEVSERVER : ''
// }))

// app.use(require('./libs/react-router'))

module.exports = app
