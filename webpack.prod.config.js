"use strict"

var config = require('./config'),
    webpack = require('webpack')

var autoprefixer        = require('autoprefixer'),
    precss              = require('precss'),
    vars                = require('postcss-simple-vars'),
    calc                = require('postcss-calc'),
    size                = require('postcss-size'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin')
    
    module.exports = {
        entry: [config.PATH.FRONTSIDE + '/main.jsx'],
        
        resolve : {
            modulesDirectories: [
                'node_modules',
                config.PATH.FRONTSIDE + '/components'
                ],
            extensions: ['', '.jsx', '.js']
        },
        
        output: {
            path: config.PATH.STATIC,
            filename: '/js/bundle.js'
        },
        
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loaders: ['babel-loader']
                },
                                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
                }
            ]
        },
        
        postcss: function () {
            return [
                autoprefixer,
                precss,
                vars({
                    variables: function () {
                            return require(config.PATH.FRONTSIDE + '/../style/variable.js')
                        }
                    }),
                calc,
                size
            ]
        },
        
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('/css/main.css'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
        ]
    }
