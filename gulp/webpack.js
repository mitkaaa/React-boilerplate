'use strict'

var webpackConfig = require('../webpack.dev.config'),
    webpackConfigProduction = require('../webpack.prod.config'),
    config = require('../config'),
    webpack = require('webpack'),
    gutil = require('gulp-util'),
    WebpackDevServer = require('webpack-dev-server')

module.exports = function (gulp) {
    var server = {}
    
    gulp.task('webpack', function () {
        webpackConfig.entry = webpackConfig.entry.concat(['webpack-dev-server/client?' + webpackConfig.hostname, 'webpack/hot/dev-server'])
        webpackConfig.watch = true
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new webpack.SourceMapDevToolPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ])
        webpackConfig.devtool = 'eval'

        new WebpackDevServer(webpack(webpackConfig), {
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
            // // watchOptions: {
            // //     aggregateTimeout: 300,
            // //     poll: 1000
            // // },
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // },
            stats: { colors: true, chunks: false }
        })
        .listen(webpackConfig.port, function (err) {
            if (err) {
                throw new gutil.PluginError('Webpack', err)
            }

            gutil.log(gutil.colors.cyan('[Webpack]'), 'server avaliable at ' + webpackConfig.hostname)
            
        })
    })

    gulp.task('webpack:production', function (callback) {
        webpack(webpackConfigProduction, function (err, stats) {
            if (err) throw new gutil.PluginError('webpack', err)
            gutil.log('[Webpack]', 'Output:\n' + stats.toString({
                chunks: false,
                colors: true
            }))
        })
    })

    return server
}
