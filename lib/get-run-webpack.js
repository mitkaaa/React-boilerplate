const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const chalk = require('chalk')
const Table = require('cli-table')
const moment = require('moment')
const makeConfig = require('./make-config')

module.exports = (config) => {
    const {
        webpackConfig,
        devServer,
        port,
        clientPath,
        serverPath,
        targetPath,
        templatePath
    } = makeConfig(config)

    const table = new Table({
        chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }
    })
    table.push(
        [`${chalk.bold('NODE_ENV')}`, `${process.env.NODE_ENV === 'production' ? chalk.yellow(process.env.NODE_ENV) : chalk.green('development')}`],
        [`${chalk.bold('PORT')}`, `${chalk.green(port)}`],
        [`${chalk.bold('DATE')}`, `${chalk.green(moment().format('DD-MM-YYYY, HH:MM:ss'))}`],
        ['', ''],
        [`${chalk.bold('Client path app')}`, `${chalk.green(clientPath)}`],
        [`${chalk.bold('Server path app')}`, `${chalk.green(serverPath)}`],
        [`${chalk.bold('Target path')}`, `${chalk.green(targetPath)}`],
        [`${chalk.bold('Template path')}`, `${chalk.green(templatePath)}`]
    )
    console.log(table.toString())

    return new WebpackDevServer(webpack(webpackConfig), devServer).listen(devServer.port)
}
