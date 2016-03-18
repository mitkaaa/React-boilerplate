var sprite = require('gulp-svg-sprite')({
    mode: {
        view: {
            dest: '',
            sprite: 'sprite.svg',
            layout: 'diagonal',
            bust: false
        }
    }
})
var watch = require('gulp-watch')

module.exports = function (gulp) {

    gulp.task('sprite:build', function () {
        gulp.src('./src/images/icons/**/*.svg')
            .pipe(sprite)
            .pipe(gulp.dest('./target/assets'))
    })

    gulp.task('sprite:watch', function () {
        watch('./src/images/icons/**/*.svg', function () {
            gulp.src('./src/images/icons/**/*.svg')
                .pipe(sprite)
                .pipe(gulp.dest('./target/assets'))
        })
    })
}
