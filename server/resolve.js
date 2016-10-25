const config = require('../config.js')
const path = require('path')
const resolve = require(path.join('/libs/resolve'))

resolve(require('../webpack/common.profile.js').resolve.modulesDirectories)
resolve.alias('store', require('../webpack/common.profile.js').resolve.alias.store)
