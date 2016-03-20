"use strict"

var config = require('./config'),
    webpack = require('webpack')

var autoprefixer        = require('autoprefixer'),
    precss              = require('precss'),
    vars                = require('postcss-simple-vars'),
    calc                = require('postcss-calc'),
    size                = require('postcss-size')
    
    module.exports = {
        devtool: 'eval',
        entry: [config.PATH.FRONTSIDE + '/main.jsx'],
        
        resolve : {
            modulesDirectories: [
                'node_modules',
                config.PATH.FRONTSIDE + '/components'
                //config.PATH.VENDOR
                ],
            extensions: ['', '.jsx', '.js']
        },
        
        output: {
            filename: config.PATH.STATIC+'/js/bundle.js'
        },
        
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loaders: ['babel-loader']
                }, 
                {
                    test:  /\.css$/,
                    exclude: /node_modules/,
                    loader: "style!css!postcss-loader"
                }
            ]
        },
        
        postcss: function () {
            return [
                autoprefixer,
                precss,
                vars({
                    variables: function () {
                            return require(config.PATH.FRONTSIDE + '/../style/variable.js');
                        }
                    }),
                calc,
                size
            ]
        },
        
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    }
    