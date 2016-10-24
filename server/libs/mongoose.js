const mongoose = require('mongoose')
const mongolab = 'mongodb://m:12345678@ds013486.mlab.com:13486/testing'

mongoose.connect(mongolab)
const db = mongoose.connection

db.on('error', (err) => {
    console.log('connection error:' + err.message)
})

db.on('disconnected',() => {
    console.log('MongoDB disconnected!')
    mongoose.connect(mongolab)
})

db.once('open', () => {
    console.log('Connected to mongo!')
})

module.exports = mongoose
