import config from '../../config'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'

import webpackConfig from '../../webpack.dev.config'

const entry = [`webpack-hot-middleware/client?${webpackConfig.hostname}`]

webpackConfig.entry = webpackConfig.entry.concat(entry)
// webpackConfig.watch = true
webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.SourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
])
webpackConfig.devtool = 'eval'

const compiler = webpack(webpackConfig)

const webpackDev = webpackDevMiddleware(compiler, {
    contentBase: config.PATH.STATIC,

    // publicPath: './',
    hot: true,
    quiet: false,
    noInfo: false,
    historyApiFallback: true,

    // build: true,

    // hot: true,
    // quiet: true,
    // noInfo: false,
    // lazy: true,
    // filename: 'bundle.js',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    // headers: { "Access-Control-Allow-Origin": "*" },
    stats: { colors: true, chunks: false }
})

const webpackHot = webpackHotMiddleware(compiler)

export { webpackDev, webpackHot }
