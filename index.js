/* eslint-disable */
'use strict'

const path = require('path')
const config = require(path.join(__dirname, 'server', 'configuration'))()
// require('babel-core/register')
require(path.join(__dirname, 'server', 'libs', 'resolve'))
require(path.join(__dirname, 'server', 'libs', 'mongoose'))
require.extensions['.css'] = () => '' // NO CSS!
