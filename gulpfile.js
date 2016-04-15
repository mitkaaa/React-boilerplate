/* eslint-disable */
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

gulp.task('default', [])
gulp.task('production', ['webpack:production'])
