/* eslint-disable */
"use strict"

const path                = require('path')
const config              = require('../server/configuration')
const webpack             = require('webpack')

const autoprefixer        = require('autoprefixer')
const precss              = require('precss')
const vars                = require('postcss-simple-vars')
const calc                = require('postcss-calc')
const size                = require('postcss-size')
const postcssSVG          = require('postcss-svg')
const ExtractTextPlugin   = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        application: [path.join(process.cwd(), config.PATH.APPFRONT, 'index.jsx')]
    },

    resolve : {
        modulesDirectories: [
            'node_modules',
            path.resolve(process.cwd(), config.PATH.APPFRONT, 'common')
            ],
        alias: {
            store: path.resolve(process.cwd(), config.PATH.APPFRONT, 'store')
        },
        extensions: ['', '.jsx', '.js']
    },
    output: {
        path: path.join(process.cwd(), config.PATH.STATIC),
        filename: 'js/[name].js',
        outputPath: path.join(process.cwd(), config.PATH.STATIC)
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
                        return require(path.join(process.cwd(), config.PATH.APPFRONT, 'style', 'variable.js'))
                    }
                }),
            calc,
            size,
            postcssSVG({
                paths: [path.join(process.cwd(), config.PATH.APPFRONT, 'style', 'icons')],
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
