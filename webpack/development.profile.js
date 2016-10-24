/* eslint-disable */
'use strict'

const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const CommonProfile = require('./common.profile.js')
const p = require('../config.js')

const webServerPort = p.portWebpackDevServer

const config = _.extend({}, CommonProfile, {
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
        }])
    },
    output: _.extend({}, CommonProfile.output, {
        publicPath: `http://localhost:${webServerPort}/`
    }),
    watch: true,
    plugins: CommonProfile.plugins.concat([
        new webpack.SourceMapDevToolPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]),
    entry: {
        application: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${webServerPort}/`,
            'webpack/hot/only-dev-server'
            ].concat(CommonProfile.entry.application)
    },
    devtool: 'eval'
})


const serverInstance = new WebpackDevServer(webpack(config), {
    contentBase: p.PATH.STATIC,
    stats: {
        chunks: false,
        colors: true
    },
    headers: {
        // 'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    historyApiFallback: true
}).listen(webServerPort, 'localhost', function (err) {
    if (err) {
        throw Error(err)
    }

    console.log(`Server avaliable at http://localhost:${webServerPort}/`)
})


module.exports = config
