'use strict'

var webpackConfigProduction = require('../webpack.prod.config'),
    webpack = require('webpack'),
    gutil = require('gulp-util')

module.exports = function (gulp) {
    var server = {}
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
