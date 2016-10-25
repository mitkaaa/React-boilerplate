/* eslint-disable */
'use strict'

require.extensions['.css'] = () => '' // NO CSS!

const path = require('path')
require(path.join(__dirname, 'server', 'libs', 'resolve'))
require(path.join(__dirname, 'server', 'libs', 'mongoose'))
require(path.join(__dirname, 'server'))
