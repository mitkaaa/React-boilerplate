module.exports = function (gulp) {

    gulp.task('copy:favicon', function () {

        gulp.src('./src/images/favicon.ico')
            .pipe(gulp.dest(gulp.config.dest))
    })

    gulp.task('copy:utils', function () {

        gulp.src('./src/js/utils/**/*')
            .pipe(gulp.dest(gulp.config.dest + '/utils'))
    })

    gulp.task('copy:images', function () {

        gulp.src('./src/images/**/*')
            .pipe(gulp.dest(gulp.config.dest + '/images'))
    })

    gulp.task('copy:fonts', function () {

        gulp.src('./src/fonts/**/*')
            .pipe(gulp.dest(gulp.config.dest + '/fonts'))
    })
}
