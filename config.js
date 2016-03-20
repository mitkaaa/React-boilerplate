var os = require('os')

module.exports = {
    PATH: {
        APP: __dirname,
        // API: __dirname+'/API',
        // VENDOR: __dirname+'/vendor',
        BACKSIDE: __dirname + '/server',
        FRONTSIDE: __dirname + '/development/js',
        STATIC: __dirname + '/static'
    },
    

    host: os.hostname(),
    port: 8080,

    webDevServerPort: 8081

}
