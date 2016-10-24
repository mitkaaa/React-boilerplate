'use strict'

const config = require('../../config')
const app = require('http').createServer()
const io = require('socket.io')(app)

app.listen(config.portSocket, () => {
    console.log(`Socket server is listening on port in ${config.portSocket} mode`)
})

export default io
