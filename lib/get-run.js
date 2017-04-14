const makeConfig = require('./make-config')
const outputCli = require('./output-cli')
const server = require('../server')

module.exports = (config) => {
    const cnfg = makeConfig(config)
    outputCli(cnfg)
    server(cnfg)
}
