/* eslint-disable */
'use strict'

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const CommonProfile = require('./common.profile.js')
const p = require('../server/configuration')

const middlewaresPath = path.join(process.cwd(), p.PATH.STUB, 'middleware', 'index.js')
const api = require('./stub/api')
const middlewares = fs.existsSync(middlewaresPath) ? require(middlewaresPath) : []

const webServerPort = p.PORTWEBPACKDEVSERVER

const config = Object.assign({}, CommonProfile, {
    id: 'development',
    env: {
        NODE_ENV: 'development',
        APP_ENV: 'development',
        DEBUG: true,
        BUILD_NUMBER: process.env.BUILD_NUMBER || 'dev',
        GIT_COMMIT: process.env.GIT_COMMIT || 'unavailable'
    },
    DEBUG: true,

    module: {
        loaders: CommonProfile.module.loaders.concat([
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: [
                'style-loader',
                'css-loader?modules&importLoaders=1&camelCase&localIdentName=[path][name]--[local]--[hash:base64:5]',
                'postcss-loader'],
        },
        {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }])
    },
    output: Object.assign({}, CommonProfile.output, {
        publicPath: `http://localhost:${webServerPort}/`
    }),
    watch: true,
    plugins: CommonProfile.plugins.concat([
        new webpack.SourceMapDevToolPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]),
    entry: {
        application: [
            // `webpack-dev-server/client?http://localhost:${webServerPort}/`,
            // 'webpack/hot/only-dev-server'
            ].concat(CommonProfile.entry.application)
    },
    devtool: 'eval'
})


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
