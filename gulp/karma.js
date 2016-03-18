var Server = require('karma').Server;
var path = require('path');


module.exports = function(gulp) {
    "use strict";
    gulp.task('karma:unit-test', function(done) {
        new Server({
            configFile: path.resolve(__dirname, '..', 'karma.config.js')
        }, done).start()
    });
}


