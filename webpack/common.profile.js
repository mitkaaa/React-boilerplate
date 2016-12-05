'use strict'

const _                   = require('lodash')
const fs                  = require('fs')
const path                = require('path')
const config              = require('../server/configuration')
const webpack             = require('webpack')

const autoprefixer        = require('autoprefixer')
const precss              = require('precss')
const vars                = require('postcss-simple-vars')
const calc                = require('postcss-calc')
const size                = require('postcss-size')

const additionalProfileWebpackPath = path.join(process.cwd(), 'webpack.profile.js')
const additionalProfileWebpack = fs.existsSync(additionalProfileWebpackPath) ? require(middlewaresPath) : {}

module.exports = _.merge({
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
        loaders: [
            {
                test: /\.svg$/,
                loaders: ['svg-inline-loader?removeTags=true&removingTags[]=title&removingTags[]=desc&removeSVGTagAttrs=false']
            }
        ]
    },

    postcss: () => {
        return [
            autoprefixer,
            precss,
            vars({
                variables: () => require(path.join(process.cwd(), config.PATH.APPFRONT, 'style', 'variable.js'))
            }),
            calc,
            size
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}, additionalProfileWebpack)
