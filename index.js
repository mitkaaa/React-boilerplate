SIDE = 'server'

var config = require('./config')
require (config.PATH.BACKSIDE + '/libs/resolve')(require('./webpack.config.js').resolve.modulesDirectories)

require('babel-core/register')
require('./server')
