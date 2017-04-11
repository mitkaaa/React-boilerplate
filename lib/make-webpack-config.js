const path = require('path')
const { merge } = require('lodash')
const wc = require('../webpack/webpack.config')

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

module.exports = ({ webpackConfig, clientPath, targetPath }) => merge({
    entry: path.join(process.cwd(), clientPath),
    output: {
        path: path.join(process.cwd(), targetPath)
    }
}, getWebpackConfig(webpackConfig), wc)
