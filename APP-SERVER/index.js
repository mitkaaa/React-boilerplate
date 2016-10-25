const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { status: 200 })
})


module.exports = [
    router
]
