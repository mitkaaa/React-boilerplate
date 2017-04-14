const app = require('express').Router()

app.get('/abcabc', (req, res) => res.send('abc/abc'))

module.exports = app