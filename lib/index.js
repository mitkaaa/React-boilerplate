const path = require('path')
const fs = require('fs-extra')
const program = require('commander')
const getRunKarma = require('./get-run-karma')
const getRun = require('./get-run')
const pckgs = require('../package.json')

program
    .version(pckgs.version)
    .description(pckgs.description)
    .option('-CP, --client-path [path]', 'Path to client application [./client]', './client')
    .option('-SP, --server-path [path]', 'Path to server application [./server]', './server')
    .option('-TP, --target-path [path]', 'Path to build and statics resources [./target]', './target')
    .option('-tP, --template-path [path]', 'Path to template [./template]', './template')
    .option('-p, --port [number]', 'Server port [3333]', 3333)
    .option('-g, --generate', 'Generation config file (not work)', () => {
        fs.copy(path.resolve(__dirname, '..', 'example'), path.resolve(process.cwd()), function (err) {
            if (err) {
                console.error(err)
            } else {
                console.log('Generate project success!')
            }
        })
    })
    .parse(process.argv)

module.exports = (config) => {
    if (program.generate) {
        return
    }
    if (path.basename(process.mainModule.filename) === 'karma') {
        return getRunKarma(config)
    }
    return getRun(config)
}
