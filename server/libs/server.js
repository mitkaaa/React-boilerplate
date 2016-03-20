import express from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import morgan from 'morgan'

export default function (port = 3000, callback) {

    // let env = process.env.NODE_ENV || 'development'

    const app = express()

    if (process.argv.indexOf('-p') >= 0) {
        port = parseInt(process.argv[process.argv.indexOf('-p') + 1])
    }

    app.set('port', port)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'))
    app.use(methodOverride('X-HTTP-Method-Override'))
    app.use(morgan('tiny'))

    return callback(express, app)
}
