const express =  require('express')
const bodyParser =  require('body-parser')
const methodOverride =  require('method-override')
const morgan =  require('morgan')
const app = express()
const cookieParser = require('cookie-parser')

module.exports = (port, callback) => {

    if (process.argv.indexOf('-p') >= 0) { // -p 8080
        port = parseInt(process.argv[process.argv.indexOf('-p') + 1])
    }

    app.set('port', port)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'))
    app.use(methodOverride('X-HTTP-Method-Override'))
    app.use(cookieParser())
    process.env.NODE_ENV !== 'production' && app.use(morgan('tiny'))

    return callback(express, app)
}
