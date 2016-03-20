"use strict"

var config = require('./config'),
    webpackConfig = require('./webpack.production.config')

var _ = require('lodash'),
    webpack = require('webpack'),
    port = config.webDevServerPort


module.exports = _.merge(webpackConfig, {
    output: {
        path: config.PATH.STATIC,
        filename: '/js/bundle.js',
        publicPath: 'http://localhost:' + port + '/'
    },

    port: port,

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test:  /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss-loader'
            }
        ]
    },
})
