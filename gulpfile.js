'use strict'

var config = require('./config'),
    gulp = require('gulp'),
    sequence = require('run-sequence'),
    path = require('path')

gulp.config = {
    dest: config.PATH.STATIC
}

require('./gulp/webpack')(gulp)
require('./gulp/esLint')(gulp)
// require('./gulp/svg-sprite')(gulp)
// require('./gulp/copy')(gulp)
// require('./gulp/less')(gulp)
// require('./gulp/lint')(gulp)
//require('./gulp/karma')(gulp)

gulp.task('default', [
    // 'sprite:watch',
    // 'less:theme:bootstrap',
    // 'copy:favicon',
    // 'copy:images',
    // 'copy:utils',
    // 'copy:fonts'
], function (callback) {
    if (process.env.NODE_ENV === 'development') {
        gulp.watch([config.PATH.FRONTSIDE + '/**/*.js', config.PATH.FRONTSIDE + '**/*.jsx'], ['lint'])
        sequence(
            'lint',
            'webpack',
            callback
        )
    }
    else {
        sequence(
            'webpack:production',
            callback
        )
    }
})
