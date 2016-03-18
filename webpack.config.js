"use strict"

var _ = require('lodash'),
    webpack = require('webpack'),
    port = 8081

var config = require('./config'),
    webpackConfig = require('./webpack.production.config')


module.exports = _.merge(webpackConfig, {
    output: {
        filename: config.PATH.STATIC+'/js/bundle.js',
        publicPath: 'http://localhost:'+port+'/'
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
                    loader: "style!css!postcss-loader"
                }
            ]
        },
})