const path = require('path')
const { merge } = require('lodash')
const wc = require('../webpack.config')

const getWebpackConfig = (config) => {
    if (config) {
        return config
    }
    try {
        return require(path.resolve(process.cwd(), 'webpack.config'))
    }
    catch (e) {
        return {}
    }
}

module.exports = (config) => {
    return merge({}, getWebpackConfig(config.webpackConfig), wc(config))
}
