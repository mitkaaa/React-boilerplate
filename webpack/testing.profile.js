/* eslint-disable */
'use strict'

const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const CommonProfile = require('./common.profile.js')
const p = require('../server/configuration')

const webServerPort = p.PORTWEBPACKDEVSERVER

module.exports = Object.assign({}, CommonProfile, {
    id: 'development',
    env: {
        NODE_ENV: 'development',
        APP_ENV: 'development',
        DEBUG: true,
        BUILD_NUMBER: process.env.BUILD_NUMBER || 'dev',
        GIT_COMMIT: process.env.GIT_COMMIT || 'unavailable'
    },
    DEBUG: true,

    module: {
        loaders: CommonProfile.module.loaders.concat([
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: [
                'style-loader',
                'css-loader?modules&importLoaders=1&camelCase&localIdentName=[path][name]--[local]--[hash:base64:5]',
                'postcss-loader'],
        },
        {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }]),
        postLoaders: [
            { // delays coverage til after tests are run, fixing transpiled source coverage error
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'istanbul-instrumenter'
            }
        ]
    },

    // output: Object.assign({}, CommonProfile.output, {
    //     publicPath: `http://localhost:${webServerPort}/`
    // }),
    watch: true,
    plugins: CommonProfile.plugins.concat([
        new webpack.SourceMapDevToolPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]),
    entry: {
        application: CommonProfile.entry.application
    },

    node: {
        fs: 'empty'
    },

    devtool: 'eval'
})
