var config = require('../config')
var path = require('path')
var less = require('gulp-less')
var LessPluginCleanCSS = require('less-plugin-clean-css')
var cleancss = new LessPluginCleanCSS({advanced: true})
var rename = require('gulp-rename')

var gutil = require('gulp-util')

module.exports = function (gulp) {

    gulp.task('less:theme:bootstrap', function () {
        return gulp
            .src(path.join(config.PATH.FRONTSIDE, 'style', 'config.less'))
            .pipe(less({
                paths: [
                    path.join(config.PATH.FRONTSIDE, 'style'),
                    path.join(__dirname, '..', 'node_modules', 'bootstrap', 'less')
                ],
                plugins: [cleancss]
            }))
            .pipe(rename('theme.css'))
            .pipe(gulp.dest(path.join(config.PATH.STATIC, 'css')))
            
    })
    
}
