/* eslint-disable */
'use strict'

require.extensions['.css'] = () => '' // NO CSS!
require.extensions['.svg'] = () => '' // NO CSS!
require('babel-core/register')({})
const path = require('path')
require(path.join(__dirname, 'server'))
require ('./server/libs/resolve')(require('./webpack/common.profile.js').resolve.modulesDirectories)
require ('./server/libs/resolve').alias('store', require('./webpack/common.profile.js').alias.store)
