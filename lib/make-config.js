const path = require('path')
const { merge, isFunction } = require('lodash')
const program = require('commander')
const makeWebpackConfig = require('./make-webpack-config')
const makeDevServerConfig = require('./make-devserver-config')

const getWebpackConfig = (config) => {
    if (isFunction(config.dangerouslyUpdateWebpackConfig)) {
        return config.dangerouslyUpdateWebpackConfig(makeWebpackConfig(config))
    }
    return makeWebpackConfig(config)
}

module.exports = (config) => {
    const port = config.port || program.port
    const cnfg = merge({
        clientPath: program.clientPath,
        serverPath: program.serverPath,
        targetPath: program.targetPath,
        templatePath: program.templatePath,
        port,
        devServer: { port },
    }, config)

    return merge({}, cnfg, { webpackConfig: getWebpackConfig(cnfg), devServer: makeDevServerConfig(cnfg) })
}
