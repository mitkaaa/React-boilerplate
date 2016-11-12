const mongoose = require('mongoose')
const chalk = require('chalk')
const mongolab = 'mongodb://m:12345678@ds013486.mlab.com:13486/testing'
const MONGO = chalk.bold('MONGO')
const db = mongoose.connection


mongoose.connect(mongolab)

db.on('error', (err) => {
    console.log(`${MONGO}: ${chalk.red(err.message)}`)
})

db.on('disconnected', () => {
    console.log(`${MONGO}: ${chalk.red('disconnected')}`)
    mongoose.connect(mongolab)
})

db.once('open', () => {
    console.log(`${MONGO}: ${chalk.green('connected')}`)
})

module.exports = mongoose
