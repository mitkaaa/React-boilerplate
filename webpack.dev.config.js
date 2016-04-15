/* eslint-disable */

"use strict"

var config = require('./config'),
    webpackConfig = require('./webpack.prod.config'),
    os = require('os')

var _ = require('lodash'),
    webpack = require('webpack')

var host = process.env.C9_HOSTNAME ? process.env.C9_HOSTNAME : `localhost:${config.port}`,
    hostname = 'http://' + host + '/'


module.exports = _.merge({}, webpackConfig, {
    output: {
        path: config.PATH.STATIC,
        filename: 'js/bundle.js',
        publicPath: hostname
    },

    hostname: hostname,

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
    }
})
