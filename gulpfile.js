'use strict'

var config = require("./config")
var gulp = require('gulp')
var sequence = require('run-sequence')
var path = require('path')

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
    'lint',
    // 'sprite:watch',
    // 'less:theme:bootstrap',
    // 'copy:favicon',
    // 'copy:images',
    // 'copy:utils',
    // 'copy:fonts'
], function (callback) {
    
    gulp.watch([config.PATH.FRONTSIDE + '/**/*.js', config.PATH.FRONTSIDE + '**/*.jsx'], ['lint'])
    sequence(
        'webpack',
        callback
    )
})

gulp.task('production', [], function (callback) {
    sequence(
        'webpack:production',
        callback
    )
})
