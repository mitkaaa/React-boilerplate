/* eslint-disable */
"use strict"

const path = require('path')
const    config = require('../config')
const    webpack = require('webpack')

const    autoprefixer        = require('autoprefixer')
const    precss              = require('precss')
const    vars                = require('postcss-simple-vars')
const    calc                = require('postcss-calc')
const    size                = require('postcss-size')
const    postcssSVG          = require('postcss-svg')
const    ExtractTextPlugin   = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        // vendor: [
        //     'axios',
        //     'classnames',
        //     'history',
        //     'moment',
        //     'react',
        //     'react-dom',
        //     'react-modal',
        //     'react-router',
        //     'react-redux',
        //     'redux',
        //     'redux-thunk',
        //     'reselect',
        //     'immutable',
        // ],
        application: [config.PATH.FRONTSIDE + '/index.jsx']
    },

    resolve : {
        modulesDirectories: [
            'node_modules',
            path.resolve(config.PATH.FRONTSIDE, 'common')
            ],
        alias: {
            store: path.resolve(config.PATH.FRONTSIDE, 'store')
        },
        extensions: ['', '.jsx', '.js']
    },
    output: {
        path: path.join(config.PATH.STATIC),
        filename: 'js/[name].js',
        outputPath: path.join(config.PATH.STATIC)
    },

    module: {
        loaders: []
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
            size,
            postcssSVG({
                paths: [config.PATH.FRONTSIDE + '/../style/icons'],
                defaults: '[fill]: #FFF;'
            })
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}
