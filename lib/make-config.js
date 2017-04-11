const { merge, isFunction } = require('lodash')
const program = require('commander')
const makeWebpackConfig = require('./make-webpack-config')
const makeDevServerConfig = require('./make-devserver-config')
const pckgs = require('../package.json')

const getWebpackConfig = (config) => {
    if (isFunction(config.dangerouslyUpdateWebpackConfig)) {
        return config.dangerouslyUpdateWebpackConfig(makeWebpackConfig(config))
    }
    return makeWebpackConfig(config)
}

program
    .version(pckgs.version)
    .description(pckgs.description)
    .option('-CP, --client-path [path]', 'Path to client application [./client]', './client')
    .option('-SP, --server-path [path]', 'Path to server application [./server]', './server')
    .option('-TP, --target-path [path]', 'Path to build and statics resources [./target]', './target')
    .option('-tP, --template-path [path]', 'Path to template [./template]', './template')
    .option('-p, --port [number]', 'Server port [3333]', 3333)
    .option('-g, --generate', 'Generation config file (not work)')
    .parse(process.argv)

module.exports = (config) => {
    const port = config.port || program.port
    const cnfg = merge({
        clientPath: program.clientPath,
        serverPath: program.serverPath,
        targetPath: program.targetPath,
        templatePath: program.templatePath,
        port,
        devServer: { port  },
    }, config)

    return merge({}, cnfg, { webpackConfig: getWebpackConfig(cnfg), devServer: makeDevServerConfig(cnfg) })
}
