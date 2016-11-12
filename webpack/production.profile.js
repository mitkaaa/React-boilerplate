/* eslint-disable */
'use strict'

const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const CommonProfile = require('./common.profile.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = _.extend({}, CommonProfile, {
    id: 'production',
    env: {
        NODE_ENV: 'production',
        APP_ENV: 'production',
        DEBUG: false,
        BUILD_NUMBER: process.env.BUILD_NUMBER || 'dev',
        GIT_COMMIT: process.env.GIT_COMMIT || 'unavailable'
    },
    DEBUG: false
})

const CSS = new ExtractTextPlugin(path.join('css', 'main.css'))

config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            dead_code: true // eslint-disable-line camelcase
        }
    }),
    CSS
])

config.module.loaders = config.module.loaders.concat([
    {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: CSS.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&camelCase&localIdentName=[hash:base64:8]',
          'postcss-loader'
        )
    },
    {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
    }
])

return webpack(config, function (err, stats) {
    if (err) {
        throw new Error('Webpack', err)
    }
    console.log('Output:\n' + stats.toString({
            chunks: false
        }))
})
