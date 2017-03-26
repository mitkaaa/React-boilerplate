/* eslint-disable */
'use strict'

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const CommonProfile = require('./common.profile.js')
const p = require('../server/configuration')
const serverConfig = require('../server/configuration')

const middlewaresPath = path.join(process.cwd(), p.PATH.STUB, 'middleware', 'index.js')
const api = require('./stub/api')
const middlewares = fs.existsSync(middlewaresPath) ? require(middlewaresPath) : []

const webServerPort = p.PORTWEBPACKDEVSERVER

const id = 'development'
const env = {
    NODE_ENV: 'development',
        APP_ENV: 'development',
        DEBUG: true,
        BUILD_NUMBER: process.env.BUILD_NUMBER || 'dev',
        GIT_COMMIT: process.env.GIT_COMMIT || 'unavailable'
}
const DEBUG = true

console.log('@@@', path.join(process.cwd(), serverConfig.PATH.APPFRONT))

const config = {
    entry: {
        application: [path.join(process.cwd(), serverConfig.PATH.APPFRONT, 'index.jsx')]
    },
    output: {
        path: path.join(process.cwd(), serverConfig.PATH.STATIC),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}


const serverInstance = new WebpackDevServer(webpack(config), {
    contentBase: p.PATH.STATIC,
    stats: {
        chunks: false,
        colors: true
    },
    headers: {
        // 'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    historyApiFallback: true,
    setup: function(app) {
        app.use('/api', api)
        middlewares.map((middleware) => {
            app.use(middleware)
        })
    }
}).listen(webServerPort, 'localhost', function (err) {
    if (err) {
        throw Error(err)
    }
})

module.exports = config
