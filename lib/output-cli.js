const chalk = require('chalk')
const Table = require('cli-table')
const moment = require('moment')

module.exports = (cnfg) => {
    const table = new Table({
        chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }
    })
    table.push(
        [`${chalk.bold('NODE_ENV')}`, `${process.env.NODE_ENV === 'production' ? chalk.green(process.env.NODE_ENV) : 'development'}`],
        [`${chalk.bold('PORT')}`, `${chalk.bold.blue(cnfg.port)}`],
        [`${chalk.bold('DATE')}`, `${chalk.green(moment().format('DD-MM-YYYY, HH:MM:ss'))}`],
        ['', ''],
        [`${chalk.bold('Client path app')}`, `${chalk.green(cnfg.clientPath)}`],
        [`${chalk.bold('Server path app')}`, `${chalk.green(cnfg.serverPath)}`],
        [`${chalk.bold('Target path')}`, `${chalk.green(cnfg.targetPath)}`],
        [`${chalk.bold('Template path')}`, `${chalk.green(cnfg.templatePath)}`]
    )
    console.log(table.toString())
}
