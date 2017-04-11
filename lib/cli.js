const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const run = require('./index')

const name = 'basis.config.js'
const fileConfig = path.resolve(process.cwd(), name)

const getConfig = (cb) => fs.readFile(fileConfig, (err) => {
    if (err) {
        console.error(chalk.red('Configuration file not found' + name))
    }
    try {
        return cb(require(fileConfig))
    }
    catch (e) {
        console.error(chalk.red('Fatal error: ' + name  + ' ' + e))
    }
})

exports.run = () => getConfig((config) => run(config))
