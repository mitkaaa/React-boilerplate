SIDE = 'server'

var config = require('./config')
require (config.PATH.BACKSIDE + '/libs/resolve')(require('./webpack.prod.config.js').resolve.modulesDirectories)

require('babel-register')({
    'plugins': [
        [
            'babel-plugin-transform-require-ignore',
            {
                extensions: ['.css']
            }
        ]
    ]
})
require('./server')

