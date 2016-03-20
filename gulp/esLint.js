var config = require('../config'),
    eslint = require('gulp-eslint'),
    gutil = require('gulp-util')


module.exports = function (gulp) {

    gulp.task('lint', function () {
        return gulp.src([config.PATH.FRONTSIDE + '/**/*.js', config.PATH.FRONTSIDE + '**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.result(function (result) {
            var msg = result.messages[0]
            if (msg) gutil.log(
                gutil.colors.cyan('[ESLint]'),
                result.filePath,
                gutil.colors.black.bgYellow.bold(msg.message),
                ' -- line ['+msg.line+'] -- column ['+msg.line+']',
                '[message] - '+ gutil.colors.black.bgYellow.bold(" " + result.messages.length + " ")
                )
        }))
    })
    
}
