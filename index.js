var config = require('./config')
require ('./server/libs/resolve')(require('./webpack.prod.config.js').resolve.modulesDirectories)

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
