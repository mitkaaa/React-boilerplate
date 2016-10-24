/* eslint-disable */

'use strict'

const path = require('path')
const args = process.argv.slice(2)
const file = (args[0] || 'development') + '.profile.js'

require(path.join(process.cwd(), 'webpack', file))
