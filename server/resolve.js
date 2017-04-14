const config = require('../config.js')
const path = require('path')
const resolve = require(path.join('/libs/resolve'))

resolve(require('./common.profile.js').resolve.modulesDirectories)
resolve.alias('store', require('./common.profile.js').resolve.alias.store)
