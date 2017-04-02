const cli = require('cli')
const options = cli.parse({
    file: [ 'f', 'A file to process', 'file'],          // -f, --file FILE   A file to process
    time: [ 't', 'An access time', 'time', false],                 // -t, --time TIME   An access time
    work: [ false, 'What kind of work to do', 'string', 'sleep' ]  //     --work STRING What kind of work to do
})


exports.getEntry = require('./get-entry')(options)

