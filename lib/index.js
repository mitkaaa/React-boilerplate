const path = require('path')
const getRunKarma = require('./get-run-karma')
const getRun = require('./get-run')

module.exports = (config) => {
    if (path.basename(process.mainModule.filename) === 'karma') {
        return getRunKarma(config)
    }
    return getRun(config)
}
