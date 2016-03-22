"use strict"

var config = require('./config'),
    webpackConfig = require('./webpack.prod.config'),
    os = require('os')

var _ = require('lodash'),
    webpack = require('webpack'),
    port = config.webDevServerPort

var ip = os.networkInterfaces().eth0[0] ? os.networkInterfaces().eth0[0].address : '0.0.0.0',
    host = process.env.C9_HOSTNAME ? process.env.C9_HOSTNAME : 'localhost',
    hostname = 'http://' + host + ':' + port + '/'


module.exports = _.merge({}, webpackConfig, {
    output: {
        path: config.PATH.STATIC,
        filename: 'js/bundle.js',
        publicPath: hostname
    },

    ip: ip,
    port: port,
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
