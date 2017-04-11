const path = require('path')
const getRunKarma = require('./get-run-karma')
const getRunWebpack = require('./get-run-webpack')

module.exports = (config) => {
    if (path.basename(process.mainModule.filename) === 'karma') {
        return getRunKarma(config)
    }
    return getRunWebpack(config)
}
