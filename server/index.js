const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const http = require('http')
const express = require('express')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const moment = require('moment')
const bodyParser =  require('body-parser')
const methodOverride =  require('method-override')
const morgan =  require('morgan')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const Table = require('cli-table')

const app = express()

module.exports = (config) => {
    app.set('env', process.env.NODE_ENV || 'development')
    app.set('port', config.port)

    app.set('views', [
        path.resolve(process.cwd(), config.templatePath),
        path.resolve(__dirname, '../example/template')
    ])
    app.set('view engine', 'html')
    app.engine('.html', require('ejs').__express)

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'))
    app.use(methodOverride('X-HTTP-Method-Override'))
    app.use(cookieParser())
    app.use(express.static(path.resolve(process.cwd(), config.targetPath)))

    if (app.get('env') === 'development') {
        // development env
        app.use(morgan('tiny'))

        /* *******************
         webpack configuration
         ******************* */

        const compiler = webpack(config.webpackConfig)
        app.use(webpackMiddleware(compiler, config.devServer))
        app.use(webpackHotMiddleware(compiler))
    } else {
        // production env
        app.use(compression())
    }

    http.createServer(app).listen(app.get('port'))

    app.get('/', (req, res) => res.render('index', {
        production: app.get('env') !== 'development',
        dev: app.get('env') === 'development' ? 'http://localhost:' + config.port : ''
    }))

    app.use(require(path.resolve(process.cwd(), config.serverPath)))

    // app.use(function(req, res, next) {
    //     res.status(404)
    //
    //     // respond with html page
    //     if (req.accepts('html')) {
    //         res.render('404', { url: req.url })
    //         return
    //     }
    //
    //     // respond with json
    //     if (req.accepts('json')) {
    //         res.send({ error: 'Not found' })
    //         return
    //     }
    //
    //     // default to plain-text. send()
    //     res.type('txt').send('Not found')
    // })

    // app.use(require('./libs/react-router'))

    return app
}
